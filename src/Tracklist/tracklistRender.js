import React from 'react';

const RenderTracklist = (props) => {

    
    return(
    <div>
        {props.songs && props.songs.map(item=>(
        <div key={item.id}>
            <div>
                <p>{item.name}</p>
                <p>{item.artist}</p>
                <p>{item.album}</p>
            </div>
            <div>
                <button onClick={()=>{props.onDelete(item.id)}}>X</button>
            </div>
        </div>
        ))}
    </div>
    );
     
};

export default RenderTracklist;