import React from 'react';
import TrackList from '../Tracklist/Tracklist';

const renderPlaylist = (props) =>{
    return(
        <div>
        <input type="text" onChange={props.onChange} value={props.playlistName}/>
        <h2>{props.playlistName}</h2> 
        <TrackList songs={props.songs} onDelete={props.onDelete}/>
    </div>
    );
};

export default renderPlaylist;