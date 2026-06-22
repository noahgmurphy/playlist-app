import React, {useState} from 'react';
import TrackList from '../Tracklist/Tracklist';
import RenderPlaylist from './playlistRender';


const Playlist = (props) =>{
    return(
    <RenderPlaylist songs={props.songs} onDelete={props.onDelete} onSave={props.onSave}/>
    );
}

export default Playlist;