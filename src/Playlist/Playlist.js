import React, {useState} from 'react';
import TrackList from '../Tracklist/Tracklist';
import RenderPlaylist from './playlistRender';


const Playlist = (props) =>{
   

const [playlistName, setPlaylistName] = useState("Name your playlist...");

const handleChange = (({target})=>{setPlaylistName(target.value);});

return(
    <RenderPlaylist songs={props.songs} onChange={handleChange} playlistName={playlistName} onDelete={props.onDelete}/>
);
}

export default Playlist;