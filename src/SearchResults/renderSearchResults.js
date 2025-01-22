import React from 'react';

const RenderSearchResults = (props) =>{
    
    return(
        <div>
        {props.results.map(item=>(
        <div key={item.id}>
            <div>
                <p>{item.name}</p>
                <p>{item.artist}</p>
                <p>{item.album}</p>
            </div>
            <div>
                <button onClick={()=>{props.onClick(item,item.id)}}>+</button>
            </div>
        </div>

        ))}
       </div>
    );
}

export default RenderSearchResults;