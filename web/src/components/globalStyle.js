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
        width: "0.75em",
      },
      
      "*::-webkit-scrollbar-track": {
        background: theme.colors.muted,
      },
      
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: theme.colors.secondary, 
      },

      ".overflow-y-none":{
        overflowY:"hidden",
      }
    })}
  />
)