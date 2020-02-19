import React from 'react'
import ReactPlayer from 'react-player'
import Styles from './embed-video.module.css'

function EmbedVideo({url}){
    return (
        <div className={Styles.wrapper}>
          <ReactPlayer
            className={Styles.player}
            url={url}
            width='100%'
            height='100%'
            controls
          />
        </div>
      )
}


export default EmbedVideo; 
