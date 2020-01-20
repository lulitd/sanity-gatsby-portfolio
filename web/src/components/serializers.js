import Figure from './figure'
import React from 'react'
import ReactPlayer from 'react-player'
const serializers = {
  types: {
    figure: Figure,
    video: ({node}) => {
      const { url } = node
      return (<ReactPlayer url={url} />)
    }
  }
}

export default serializers
