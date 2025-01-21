import React from 'react';

const RenderTracklist = (props) => {

    
    return(
       <div>
        {props.songs.map(item=>(
        <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.artist}</p>
            <p>{item.album}</p>
        </div>
        ))}
       </div>
    );
     
};

export default RenderTracklist;