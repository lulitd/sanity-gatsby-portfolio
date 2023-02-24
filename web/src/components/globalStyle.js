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
        width: "0.5em",
      },
      
      "*::-webkit-scrollbar-track": {
        background: theme.colors.primary900,
      },
      
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: theme.colors.primary, 
      },

      ".overflow-y-none":{
        overflowY:"hidden",
      }
    })}
  />
)