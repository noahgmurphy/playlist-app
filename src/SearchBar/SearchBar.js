import React, {useState} from 'react';
import SearchResults from '../SearchResults/SearchResults.js';


/*https://api.spotify.com/v1/search?q=track%3Astay&type=track&limit=1 */
const SearchBar = (props) =>{
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
        endpoint+="&limit=2";
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


    return(
        <div>
            
                <input type="text" id="search_input"></input>
                <button onClick={handleSearch}>SEARCH</button>
                <SearchResults searchResults={searchResults} handleAdd={props.handleAdd}/>
            
        </div>
    );
};

export default SearchBar;