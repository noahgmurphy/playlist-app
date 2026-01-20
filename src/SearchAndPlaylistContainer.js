import React, {useState} from 'react';
import SearchResults from './SearchResults/SearchResults.js';
import Playlist from './Playlist/Playlist.js';
import SearchBar from './SearchBar/SearchBar.js';
import styles from './SearchAndPlaylistContainer.module.css'

const SearchAndPlaylistContainer = (props) =>{

    
////
    const [playlistName, setPlaylistName] = useState("Name your playlist...");
    const [playlist, setPlaylist] = useState([]);
    const [uriArr, setUriArr] = useState([]);
////
const handleChangeName = (({target})=>{setPlaylistName(target.value);});
////

    const handleAdd = (item, id) =>{

        if(playlist && playlist.length>=1 && playlist.length<15)
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
        else if(playlist&&playlist.length>=15){                     // 15 song limit
            alert("No More");  
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
////SEARCH LOGIC
const resultsArr = [];
    const [searchResults, setSearchResults] = useState([]);
    const token = props.token;
    let endpoint = 'https://api.spotify.com/v1/search';

    const handleSearch = async() =>{
        let searchInput = document.getElementById('search_input').value;
        console.log(searchInput);
        endpoint+="?q=track%3A";
        endpoint+=searchInput;
        endpoint+="&type=track";
        endpoint+="&limit=15";
        try{
            const response = await fetch(endpoint, {headers:{Authorization: 'Bearer ' + token}})
                .then((response)=>response.json())
                .then((data)=> {
                    for(const item of data.tracks.items){
                    resultsArr.push({
                     id:item.id,
                     name: item.name,
                     artist: item.artists[0].name,
                     album: item.album.name,
                     uri: item.uri   
                    });
                } 
                /*
                console.log(data.tracks.items[0]);
                console.log(data.tracks.items[0].album.name);
                console.log(data.tracks.items[0].artists[0].name);
                console.log(data.tracks.items[0].name);
                console.log(data.tracks.items[0].id);
                console.log(data.tracks.items[0].uri);
                console.log(resultsArr);
                */
                setSearchResults(resultsArr);
            })

        }
        catch(error){
            console.log(error);
        }
        
    }

////


return(
    <div className={styles.container}>
        <div className={styles.searchbar}>
            <SearchBar token={props.token} handleSearch={handleSearch}/>
        </div>
        <div className={styles.search}>
            <div className={styles.resultstitlecontainer}>
                <p className={styles.resultstitle}>Search Results</p>
            </div>
            <SearchResults searchResults={searchResults} handleAdd={handleAdd}/>
        </div>
        <div className={styles.playlist}>
            <div className={styles.namecontainer}>
                <input style={{outline: 'none'}} className={styles.playlistname} type="text" onChange={handleChangeName} value={props.playlistName}/>
            </div>
            <Playlist songs={playlist} onDelete={handleDelete} onSave={handleSavePlaylist} playlistName={playlistName}/>
        </div>
    </div>
)

};

export default SearchAndPlaylistContainer;
    


    