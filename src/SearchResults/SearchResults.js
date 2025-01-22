import React, {useState} from 'react';
import RenderSearchResults from './renderSearchResults'
import Playlist from '../Playlist/Playlist.js'

const SearchResults = () => {
 
    const [searchResults, setSearchResults] = useState([
        { 
          name: "I Fall Apart", 
          artist: "Post Malone",
          album: "Stoney",
          id: "1"
        },
        {
          name: "Call",
          artist: "Lil Mosey",
          album: "Call - Single",
          id: "2"
          
        }
      ]);


    const [playlist, setPlaylist] = useState([{
        name: "Hello",
        artist: "Adele",
        album: "Single",
        id: "3"
    }]);


    
    const handleAdd = (item, id) =>{
        for(let i=0; i<playlist.length; i++){                    //this functio loops through playlist 
            if(Object.values(playlist[i]).includes(id)){         //checks if song is already added
                alert("This song is already in your playlist");   //
                break;
            }                                                    //
            else if(playlist.length-i===1){                      //if not... add to playlist
                setPlaylist((prev)=>[...prev, item]);
                
            }
        }
        
    };

    return(
        <div>
            <RenderSearchResults results={searchResults} onClick={handleAdd}/>
            <Playlist songs={playlist}/>
        </div>
    );
};

export default SearchResults;