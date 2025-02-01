import React, {useState} from 'react';
import SearchResults from './SearchResults/SearchResults.js';
import Playlist from './Playlist/Playlist.js';

const SearchAndPlaylistContainer = () =>{

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
    const [playlist, setPlaylist] = useState([]);
    const [uriArr, setUriArr] = useState([]);
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
    const handleSavePlaylist = () =>{
        let arr = [];
        for(const songObj of playlist){
            arr.push(songObj.uri);
        }
    console.log(arr);
        setUriArr(arr);
        setPlaylist([]);
        
        
    };
////

return(
    <div>
        <SearchResults searchResults={searchResults} handleAdd={handleAdd}/>
        <Playlist songs={playlist} onDelete={handleDelete} onSave={handleSavePlaylist}/>
    </div>
)

};

export default SearchAndPlaylistContainer;
    


    