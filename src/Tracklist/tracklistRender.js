import React from 'react';
import styles from './Tracklist.module.css'
const RenderTracklist = (props) => {

    const RenderSave = () =>{
        return(
        <button className={styles.savebutton} onClick={props.onSave}>SAVE TO SPOTIFY</button>
        );
    }

    
    
    return(
    <div>
        {props.songs && props.songs.map(item=>(
        <div key={item.id} className={styles.container}>
            <div className={styles.resulttext}>
                <p className={styles.title}>{item.name}</p>
                <p className={styles.description}>{item.artist} | {item.album}</p>
            </div>
            <div className={styles.button}>
                <button onClick={()=>{props.onDelete(item.id)}}>X</button>
            </div>
        </div>
        ))}
        {props.songs.length>=1 && 
            <div className={styles.savebuttoncontainer}>
                <RenderSave/>
            </div>}

    </div>
    );
     
};

export default RenderTracklist;