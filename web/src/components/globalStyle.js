import React from 'react'
import { Global } from '@emotion/react'

export default (props) =>(
  <Global
    styles={ (theme) => ({
     "*": {
        scrollbarWidth: "thin",
        scrollbarColor: "blue orange",
      },
      
      /* Works on Chrome, Edge, and Safari */
      "*::-webkit-scrollbar": {
        width: "0.5rem",
      },
      
      "*::-webkit-scrollbar-track": {
        background: "red"
      },
      
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "blue",
        borderRadius:"0.25rem",
        border:"3px solid red",
        borderColor:  "red",
        
      },

      ".overflow-y-none":{
        overflowY:"hidden",
      }
    })}
  />
)