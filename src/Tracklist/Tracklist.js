import React, {useState} from 'react';
import RenderTracklist from './tracklistRender';


  const TrackList = () => {

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

    return(
        <div>
            <p>Hello</p>
            <RenderTracklist songs={songs}/>
        </div>
    );
  };

  export default TrackList;