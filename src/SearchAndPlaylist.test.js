/**
 * @jest-environment jsdom
*/
import React from 'react';
import { act } from 'react'; 
import {render, screen, fireEvent} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import SearchAndPlaylistContainer from './SearchAndPlaylistContainer.js';
import TokenAndPermission from './APIhandling/TokenAndPermission.js';
import { webcrypto } from 'node:crypto';
import { redirectForPermission } from './utils.js';
jest.mock('./utils.js');

test('properly calls search on api with correct input url', async()=>{
    const user = userEvent.setup();
    global.fetch = jest.fn(()=>
        Promise.resolve({json: () => Promise.resolve({ data: 'mock_data' })})
    )
    
    await act(async () => {
         render(<SearchAndPlaylistContainer/>);
    })
   
    
    const inputElement = await screen.findByTestId('searchInput') 
    await user.type(inputElement, "Test");

    const buttonElement = await screen.findByTestId('searchButton') 
    fireEvent.click(buttonElement);

    
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('?q=track%3ATest&type=track&limit=10'), expect.anything());

})

test('properly adds a song to the playlist', async()=>{
    const user = userEvent.setup();
    const mockSearchResults = 
    {
        "tracks": {
            "items": [
                {
                    "id": "TestID",
                    "name": "Test Name",
                    "artists": [{"name": "Test Artist"}],
                    "album": {"name":"Test Album"},
                    "uri": "Test URI"
                }
            ]
        }
    };
    
    global.fetch = jest.fn(()=>
        Promise.resolve({json: () => Promise.resolve(mockSearchResults)})
    )
    
    await act(async () => {
        render(
            <SearchAndPlaylistContainer/>
        );
    });

    const inputElement = await screen.findByTestId('searchInput') 
    await user.type(inputElement, "Test");

    const searchButtonElement = await screen.findByTestId('searchButton')
    await user.click(searchButtonElement);

    const addButtonElement = await screen.findByTestId('addButton')
    await user.click(addButtonElement);

    const addedItem = await screen.findByTestId('addedItem')
    expect(addedItem.textContent).toContain('Test Artist | Test Album');


})

test('properly deletes a song from the playlist', async()=>{
    const user = userEvent.setup();
    const mockSearchResults = 
    {
        "tracks": {
            "items": [
                {
                    "id": "TestID",
                    "name": "Test Name",
                    "artists": [{"name": "Test Artist"}],
                    "album": {"name":"Test Album"},
                    "uri": "Test URI"
                }
            ]
        }
    };
    
    global.fetch = jest.fn(()=>
        Promise.resolve({json: () => Promise.resolve(mockSearchResults)})
    )
    
    await act(async () => {
        render(
            <SearchAndPlaylistContainer/>
        );
    });

    const inputElement = await screen.findByTestId('searchInput'); 
    await user.type(inputElement, "Test");

    const searchButtonElement = await screen.findByTestId('searchButton'); 
    await user.click(searchButtonElement);

    const addButtonElement = await screen.findByTestId('addButton') 
    await user.click(addButtonElement);

    const addedItem = await screen.findByTestId('addedItem');
    expect(addedItem.textContent).toContain('Test Artist | Test Album');

    const deleteButtonElement = await screen.findByTestId('deleteButton');
    await user.click(deleteButtonElement);
    expect(screen.queryByTestId('addedItem')).toBeNull();

})

test('properly redirects to permission page', async()=>{
    const user = userEvent.setup();
    
    Object.defineProperty(global.self, 'crypto', {
        value: webcrypto
    });

    await act(async () => {
        render(
            <TokenAndPermission/>
        );
    });

    const permissionButton = await screen.findByTestId('permissionButton');
    await user.click(permissionButton); 
    const callArg = redirectForPermission.mock.lastCall[0];
    const url = new URL(callArg);

    expect(redirectForPermission).toHaveBeenCalled();
    expect(url.origin + url.pathname).toBe('https://accounts.spotify.com/authorize');
    expect(url.searchParams.get('response_type')).toBe('code');
    expect(url.searchParams.get('client_id')).toBeDefined();
    const scope = url.searchParams.get('scope').split(' ');
    expect(scope).toEqual(expect.arrayContaining(['user-read-private','user-read-email','playlist-modify-private','playlist-modify-public']));
    expect(url.searchParams.get('code_challenge_method')).toBe('S256');
    expect(url.searchParams.get('code_challenge')).toBeDefined();
})

test('properly saves playlist', async()=>{
    const user = userEvent.setup();
    const mockSearchResults = 
    {
        "tracks": {
            "items": [
                {
                    "id": "TestID",
                    "name": "Test Name",
                    "artists": [{"name": "Test Artist"}],
                    "album": {"name":"Test Album"},
                    "uri": "Test URI"
                }
            ]
        }
    };

    global.fetch = jest.fn();

    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => (mockSearchResults)
    });
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({id:'testUserId'})
    });
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({id:'testPlaylistId'})
    });

    await act(async () => {
        render(
            <SearchAndPlaylistContainer/>
        );
    });

    const inputElement = await screen.findByTestId('searchInput') 
    await user.type(inputElement, "Test");

    const searchButtonElement = await screen.findByTestId('searchButton')
    await user.click(searchButtonElement);

    const addButtonElement = await screen.findByTestId('addButton')
    await user.click(addButtonElement);

    const savePlaylistButtonElement = await screen.findByTestId('savePlaylistButton') 
    await user.click(savePlaylistButtonElement);

    
    
    const firstCallArgs = global.fetch.mock.calls[1];
    const secondCallArgs = global.fetch.mock.calls[2];
    const thirdCallArgs = global.fetch.mock.calls[3];

    
    expect (firstCallArgs).toEqual(expect.arrayContaining(['https://api.spotify.com/v1/me', { headers: { Authorization: expect.stringContaining('Bearer') } }]));
    
    expect (secondCallArgs).toEqual(expect.arrayContaining([
        'https://api.spotify.com/v1/users/testUserId/playlists',
        {
            method: 'POST',
            headers: {
            Authorization: expect.stringContaining('Bearer'),
            'Content-Type': 'application/json'
            },
            body: '{"name":"Name your playlist...","public":false}'
        }
    ]))
    
    expect (thirdCallArgs).toEqual(expect.arrayContaining([
        'https://api.spotify.com/v1/playlists/testPlaylistId/tracks',
        {
            method: 'POST',
            headers: {
                Authorization: expect.stringContaining('Bearer'),
                'Content-Type': 'application/json'
            },
            body: '{"uris":["Test URI"],"position":0}'
        }
    ]))
})
