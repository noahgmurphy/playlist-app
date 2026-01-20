import React, {useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from '../SearchResults/SearchResults.js';
import SearchAndPlaylistContainer from '../SearchAndPlaylistContainer.js';
import styles from './TokenAndPermission.module.css';

const TokenAndPermission = () =>{
    
    const [accessToken, setAccessToken] = useState();
    const [grantedAccess, setGrantedAccess] = useState(false);
    useEffect(()=>{                                                 //clears local storage from previous run 
        const hasSession = sessionStorage.getItem('hasSession');
        if(!hasSession){
            localStorage.removeItem('timeRemaining');
            localStorage.removeItem('access_token');
            localStorage.removeItem('grantedAccess');
        }
        sessionStorage.setItem('hasSession', 'true');
    })
    useEffect(()=>{
        if(grantedAccess){
            startCountdown(3600);
        }

    }, [grantedAccess]);
    //ACCESS AND STATE PERSISTENCE useEffect
    const location = useLocation; 
    let firstRun = true;
    const urlParams = new URLSearchParams(window.location.search);
    useEffect(()=>{
        if(firstRun && urlParams.get('code')){                  //only runs if first mount AND if redirect from permissions page has already occured
            console.log("useEffect Called");
            let code = urlParams.get('code');
            if(!localStorage.getItem('grantedAccess')){         
                localStorage.removeItem('timeRemaining');
                getToken(code);
            }
            else{
            setGrantedAccess(localStorage.getItem('grantedAccess'));
            setAccessToken(localStorage.getItem('access_token'));
            }
        }
        firstRun = false;
    }, [location]); 
    //CODE CHALLENGE GENERATION HELPER FUNCTIONS
    const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }
    
    const sha256 = async (plain) => {
        const encoder = new TextEncoder()
        const data = encoder.encode(plain)
        return await window.crypto.subtle.digest('SHA-256', data)
    }

    const base64encode = (input) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }
    //TOKEN RETRIEVAL
    const getToken = async code => {
        const codeVerifier = localStorage.getItem('code_verifier');
        const url = "https://accounts.spotify.com/api/token";
        const payload = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
            client_id: 'be3f335a11b849da9e8f37de0c9fa129',
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'https://192.168.1.137:3000',
            code_verifier: codeVerifier,
            }),
        }
        const body = await fetch(url, payload);
        const response = await body.json();
        console.log(response);
        localStorage.setItem('access_token', response.access_token);
        console.log(response.access_token)
        if(response.access_token){ 
            localStorage.setItem('grantedAccess', true)                         
            setAccessToken(response.access_token);  
            setGrantedAccess(true);
            localStorage.removeItem('code_verifier');
        }
    }
    //USER SPOTIFY CONNECTION PERMISSION
    const getPermissions = async() => {
        const codeVerifier  = generateRandomString(64);
        const hashed = await sha256(codeVerifier)
        const codeChallenge = base64encode(hashed);
        const clientId = 'be3f335a11b849da9e8f37de0c9fa129';
        const redirectUri = 'https://192.168.1.137:3000';
        const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
        const authUrl = new URL("https://accounts.spotify.com/authorize")
        window.localStorage.setItem('code_verifier', codeVerifier);
        const params =  {
            response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }
        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    }
    //COUNTDOWN FUNCTION
    
    //After 1 hour resets grantedAccess to false
    const startCountdown = (durationInSeconds) =>{
        let timeRemaining = localStorage.getItem('timeRemaining') || durationInSeconds;
        const intervalId = setInterval(()=>{
        timeRemaining--;
        localStorage.setItem('timeRemaining', timeRemaining); //STORES TIME IN CASE OF PAGE REFRESH
        /*console.log(timeRemaining);*/
        if (timeRemaining<0){
            localStorage.clear();
            clearInterval(intervalId);
            setGrantedAccess(false);
            setAccessToken(null);
            console.log("COUNTDOWN FINISHED");
            }
        }, 1000)
    };

    const printToken = () =>{
        console.log(accessToken); 
        console.log(grantedAccess);
    }

    return(
        <div>
            {!grantedAccess && 
            <div className={styles.permissioncontainer}>
                <h2>Do you want to allow this app to access your spotify account?</h2>
                <button onClick={getPermissions}>GRANT ACCESS</button>
            </div>
            }
            {grantedAccess && <SearchAndPlaylistContainer token={accessToken}/>}
           
        </div>
    )



}

export default TokenAndPermission;