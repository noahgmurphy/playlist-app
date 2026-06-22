import React, {useState} from 'react';
import SearchResults from '../SearchResults/SearchResults.js';
import styles from '../SearchAndPlaylistContainer.module.css'

const SearchBar = (props) =>{
    return(
        <div>
            <div className={styles.child}>
                <input data-testid="searchInput"  className={styles.searchinput} type="text" id="search_input"></input>
                <button data-testid="searchButton"  id="search_button" className={styles.searchbutton} onClick={props.handleSearch}>SEARCH</button>
            </div>
        </div>
    );
};

export default SearchBar;