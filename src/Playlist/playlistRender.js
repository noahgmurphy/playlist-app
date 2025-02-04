import React from 'react';
import TrackList from '../Tracklist/Tracklist';

const renderPlaylist = (props) =>{
    return(
    <div>
        <TrackList songs={props.songs} onDelete={props.onDelete} onSave={props.onSave}/>
    </div>
    );
};

export default renderPlaylist;