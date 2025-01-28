import React from 'react';

const RenderTracklist = (props) => {

    const RenderSave = () =>{
        return(
        <button onClick={props.onSave}>SAVE</button>
        );
    }

    
    
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
        {props.songs.length>=1 && <RenderSave/>}
    </div>
    );
     
};

export default RenderTracklist;