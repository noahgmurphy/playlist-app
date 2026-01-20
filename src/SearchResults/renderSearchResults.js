import React from 'react';
import styles from './SearchResults.module.css'

const RenderSearchResults = (props) =>{
    
    return(
        <div>
        {props.results.map(item=>(
        <div key={item.id} className={styles.container}>
            <div className={styles.resulttext}>
                <p className={styles.title}>{item.name}</p>
                <p className={styles.description}>{item.artist} | {item.album}</p>
            </div>
            <div className={styles.button}>
                <button onClick={()=>{props.onClick(item,item.id)}}>+</button>
            </div>
        </div>

        ))}
        
       </div>
    );
}

export default RenderSearchResults;