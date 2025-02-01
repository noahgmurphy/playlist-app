import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from '../SearchResults/SearchResults.js';
import SearchAndPlaylistContainer from '../SearchAndPlaylistContainer.js';

const TokenAndPermission = () =>{
    
    const [accessToken, setAccessToken] = useState();

    //Sets grantedAccess to false
    //When grantedAccess changes calls startCoundown
    const [grantedAccess, setGrantedAccess] = useState(false);
    useEffect(()=>{
       
        if(grantedAccess){
        startCountdown(15);
        }
    }, [grantedAccess]);
    /////////
    /*WHEN PAGE REFRESH GrantedAcess switches back to false*/

    /////////

    //When url is changed...calls getAccess token
    const location = useLocation; 
    useEffect(getAccessToken, [location]); //IF URL CHANGES...GET TOKEN

    //GET PERMISSION
    //Redirects user to permission page
    //If permission granted...url will now contain access token
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
    
    //PARSE NEW URL
    //Takes hash from url 
    //Uses SearchParams.get to retrieve "access_token"
    //Sets token and grantedAccess boolean if token is found 
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

    //COUNTDOWN FUNCTION
    //Starts countdown when grantedAccess is true
    //After 1 hour... removes token from URL and resets grantedAccess to false
    const startCountdown = (durationInSeconds) =>{
       
        let timeRemaining = localStorage.getItem('timeRemaining') || durationInSeconds;
        const intervalId = setInterval(()=>{
        timeRemaining--;
        localStorage.setItem('timeRemaining', timeRemaining); //STORES TIME IN CASE OF PAGE REFRESH
        console.log(timeRemaining);

            if (timeRemaining<0){
                localStorage.clear();
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

    const printToken = () =>{
        console.log(accessToken); 
        console.log(grantedAccess);
    }

    return(
        <div>
            {!grantedAccess && <button onClick={getPermissions}>GRANT ACCESS</button>}
            {grantedAccess && <SearchAndPlaylistContainer token={accessToken}/>}
            <button onClick={printToken}> PRINT TOKEN</button>
        </div>
    )



}

export default TokenAndPermission;