import React from 'react'
import { Global } from '@emotion/core'
import {alpha} from "@theme-ui/color"

export default props =>
  <Global
    styles={theme => ({
     "*": {
        scrollbarWidth: "thin",
        scrollbarColor: "blue orange",
      },
      
      /* Works on Chrome, Edge, and Safari */
      "*::-webkit-scrollbar": {
        width: "0.5rem",
      },
      
      "*::-webkit-scrollbar-track": {
        background: theme.colors.muted,
      },
      
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: theme.colors.secondary,
        borderRadius:"0.25rem",
        border:"3px solid red",
        borderColor:  theme.colors.secondary,
        
      },

      ".overflow-y-none":{
        overflowY:"hidden",
      }
    })}
  />