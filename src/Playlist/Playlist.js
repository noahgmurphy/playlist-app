import React, {useState} from 'react';
import TrackList from '../Tracklist/Tracklist';
import RenderPlaylist from './playlistRender';


const Playlist = (props) =>{
   

/*
const [playlistName, setPlaylistName] = useState("Name your playlist...");


const handleChangeName = (({target})=>{setPlaylistName(target.value);});
*/



return(
    <RenderPlaylist songs={props.songs} onDelete={props.onDelete} onSave={props.onSave}/>
);
}

export default Playlist;