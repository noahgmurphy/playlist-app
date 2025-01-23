import React, {useState} from 'react';
import RenderTracklist from './tracklistRender';


  const TrackList = (props) => {

   

    return(
        <div>
            <RenderTracklist songs={props.songs} onDelete={props.onDelete}/>
        </div>
    );
  };

  export default TrackList;