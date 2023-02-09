import React from 'react'
import ReactPlayer from 'react-player'

const Preview = (props) => {
  const {url, renderDefault} = props; 

  if (!url){
    return <div> Missing Video URL </div>
  }
  return (
  <div>
    {renderDefault({...props, title:"Video Embed"})}
    <ReactPlayer url={url} />
  </div>
  )
}

export default {
  name: 'video',
  type: 'object',
  title: 'Video Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'video URL'
    }
  ],
  preview: {
    select: {
      url: 'url'
    },
  },
  components: {
    preview: Preview
  },
}
