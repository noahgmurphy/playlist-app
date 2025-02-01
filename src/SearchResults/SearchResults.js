import React, {useState, useEffect} from 'react';
import RenderSearchResults from './renderSearchResults';
import Playlist from '../Playlist/Playlist.js';
import { useLocation } from 'react-router-dom';

const SearchResults = (props) => {
 
 /*   const [searchResults, setSearchResults] = useState([
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
    

    const [playlist, setPlaylist] = useState([]);
    const [uriArr, setUriArr] = useState([]);
 */   
    
    // const [accessToken, setAccessToken] = useState();

    
    //Sets grantedAccess to false
    //When grantedAccess changes calls startCoundown
    /*
    const [grantedAccess, setGrantedAccess] = useState(false);
    useEffect(()=>{
        if(grantedAccess){
        startCountdown(15);
        }
    }, [grantedAccess]);
*/
    
    //When url is changed...calls getAccess token
    /*
    const location = useLocation; 
    useEffect(getAccessToken, [location]); //IF URL CHANGES...GET TOKEN
    */
    
    

    


/*    
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

    const handleSavePlaylist = () =>{
        let arr = [];
        for(const songObj of playlist){
            arr.push(songObj.uri);
        }
       
        setUriArr(arr);
        setPlaylist([]);
        
        
    };
*/
//GET PERMISSION
//Redirects user to permission page
//If permission granted...url will now contain access token
/*
const getPermissions = () => {
    var client_id = 'be3f335a11b849da9e8f37de0c9fa129';
    var redirect_uri = 'http://localhost:3000';
    var scope = 'user-read-private user-read-email';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    
    window.location.href=url; ///REDIRECT
}
*/

//PARSE NEW URL
//Takes hash from url 
//Uses SearchParams.get to retrieve "access_token"
//Sets token and grantedAccess boolean if token is found 
/*
function getAccessToken(){
    const parsedHash = new URLSearchParams(  
        window.location.hash.substring(1) 
      );
    const token = parsedHash.get("access_token");
    
    if(token){                          
      setAccessToken(token);  
      setGrantedAccess(true);
    }
}
*/




 //COUNTDOWN FUNCTION
 //Starts countdown when grantedAccess is true
 //After 1 hour... removes token from URL and resets grantedAccess to false
/*
const startCountdown = (durationInSeconds) =>{
    let timeRemaining = durationInSeconds;

    const intervalId = setInterval(()=>{
        timeRemaining--;
        
        if (timeRemaining<0){
            clearInterval(intervalId);
            setGrantedAccess(false);
            setAccessToken(null);
            console.log("COUNTDOWN FINISHED");
            var currentURL = window.location.href;
            if(window.location.hash){
                window.history.pushState("", document.title, currentURL.split('#')[0]);
            }
        }
    }, 1000)
};
*/

//
    return(
        <div>
            <RenderSearchResults results={props.searchResults} onClick={props.handleAdd}/>
        </div>
    );
};

export default SearchResults;