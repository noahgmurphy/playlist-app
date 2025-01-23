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


    const [playlist, setPlaylist] = useState([]);


    
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

    const handleDelete = (id) =>{
       setPlaylist((prev)=>prev.filter((item)=>item.id!=id));
    };

    return(
        <div>
            <RenderSearchResults results={searchResults} onClick={handleAdd}/>
            <Playlist songs={playlist} onDelete={handleDelete}/>
        </div>
    );
};

export default SearchResults;