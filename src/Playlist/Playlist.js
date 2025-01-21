import React, {useState} from 'react';
import TrackList from '../Tracklist/Tracklist';
import RenderPlaylist from './playlistRender';


const Playlist = () =>{
    const [songs, setSongs] = useState([
        { 
          name: "I Fall Apart", 
          artist: "Post Malone",
          album: "Stoney",
          id: "1"
        },
        {
          name: "Call",
          artist: "Lil Mosey",
          album: "Call - Single",
          id: "2"
          
        }
      ]);

const [playlistName, setPlaylistName] = useState("Name your playlist...");

const handleChange = (({target})=>{setPlaylistName(target.value);});

return(
    /*
    <div>
        <input type="text" onChange={handleChange} value={playlistName}/>
        <h2>{playlistName}</h2>
        <TrackList songs={songs}/>
    </div>
    */

    <RenderPlaylist songs={songs} onChange={handleChange} playlistName={playlistName} tracklist={TrackList}/>
);
}

export default Playlist;