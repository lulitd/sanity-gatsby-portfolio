import Figure from './figure'
import React from 'react'
import EmbedVideo from './embed-video'
const serializers = {
  types: {
    figure: Figure,
    video: ({node}) => {
      const { url } = node
      return (<EmbedVideo url={url}/>)
    }
  }
}

export default serializers
