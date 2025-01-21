import React from 'react';

const RenderTracklist = (props) => {

    
    return(
       <div>
        {props.songs.map(item=>(
        <div>
            <p>{item.name}</p>
            <p>{item.artist}</p>
            <p>{item.album}</p>
            <p>{item.id}</p>
        </div>
        ))}
       </div>
    );
     /* props.songs.map((item)=>{
        return(
            <div>
                
            </div>
        )
      });
      */
};

export default RenderTracklist;