import React, {useState} from 'react';
import SearchResults from './SearchResults/SearchResults.js';
import Playlist from './Playlist/Playlist.js';
import SearchBar from './SearchBar/SearchBar.js';

const SearchAndPlaylistContainer = (props) =>{

    const [searchResults, setSearchResults] = useState([
        { 
            name: "I Fall Apart", 
            artist: "Post Malone",
            album: "Stoney",
            id: "1",
            uri: "989"
        },
        {
            name: "Call",
            artist: "Lil Mosey",
            album: "Call - Single",
            id: "2",
            uri: "253"
              
        }
    ]);
////
    const [playlistName, setPlaylistName] = useState("Name your playlist...");
    const [playlist, setPlaylist] = useState([]);
    const [uriArr, setUriArr] = useState([]);
////
const handleChangeName = (({target})=>{setPlaylistName(target.value);});
////

    const handleAdd = (item, id) =>{

        if(playlist && playlist.length>=1)
        {
        for(let i=0; i<playlist.length; i++){                    //this function loops through playlist 
                                                                //FIX logs playlist length 2 even after deleting from playlist FIX
            if(Object.values(playlist[i]).includes(id)){         //checks if song is already added
                alert("This song is already in your playlist");  //
                break;
            }                                                    //
            else if(playlist.length-i===1){                      //if not... add to playlist
                setPlaylist((prev)=>[...prev, item]);
                                                                //ADD THIS FUNCTION TO A CONTAINER COMPONENT
                
            }
        }
        }
        else if(playlist&&playlist.length<1){ 
            setPlaylist((prev)=> [...prev, item])
        }
    };
////
    const handleDelete = (id) =>{
        setPlaylist((prev)=>prev.filter((item)=>item.id!=id));
    };
////
    const handleSavePlaylist = async() =>{
        //GETS ARRAY OF SONG id's
        let arr = [];
        let idArr = [];
        let userId = "";
        let playlistId = "";
        for(const songObj of playlist){
            arr.push(songObj.uri);
        }
        setUriArr(arr);
        console.log(uriArr);
        
        /*
        arr.forEach((item)=>{
            let str = [];
            str = item.split('track:');
            idArr.push(str[1]);
        })
        */

        //
        //FETCHES USER ID
        try{
            const response = await fetch("https://api.spotify.com/v1/me", {headers:{Authorization: 'Bearer ' + props.token}})
                .then((response)=> response.json())
                    .then((data)=> userId=data.id)
        }
        catch(error){
            console.log(error);
        }
        //
        //CREATES SPOTIFY PLAYLIST WITH
        try{
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                method: 'POST',
                headers:{
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": playlistName,
                    "public": false
                }),
            })
                .then((response)=> response.json())
                    .then((data)=> playlistId=data.id)
        }
        catch(error){
            console.log(error);
        }
        //
        //ADDS SONGS TO PLAYLIST USING URI'S
        try{
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{
                method: 'POST',
                headers:{
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "uris": arr,
                    "position": 0  
                }) 
            })
        }
        catch(error){
            console.log(error);
        }
        
    /*
    console.log(userId);
    console.log(arr);
    console.log(idArr);
    */

       /* setUriArr(arr);*/
        setPlaylist([]);
        
        
    };
////

return(
    <div>
        <SearchBar token={props.token} handleAdd={handleAdd}/>
        <div>
            <input type="text" onChange={handleChangeName} value={props.playlistName}/>
            <h2>{playlistName}</h2>
            <Playlist songs={playlist} onDelete={handleDelete} onSave={handleSavePlaylist} playlistName={playlistName}/>
        </div>
    </div>
)

};

export default SearchAndPlaylistContainer;
    


    