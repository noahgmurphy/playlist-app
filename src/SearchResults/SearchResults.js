import React, {useState, useEffect} from 'react';
import RenderSearchResults from './renderSearchResults';
import Playlist from '../Playlist/Playlist.js';
import { useLocation } from 'react-router-dom';

const SearchResults = (props) => {
    return(
        <div>
            <RenderSearchResults results={props.searchResults} onClick={props.handleAdd}/>
        </div>
    );
};

export default SearchResults;