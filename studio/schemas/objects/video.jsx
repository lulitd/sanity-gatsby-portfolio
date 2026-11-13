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
    name: "url",
    type: "url",
    title: "Video URL",
    validation: Rule => Rule.required(),
  },
  {
    name: "caption",
    type: "string",
    title: "Caption",
  },
  {
    name: "title",
    type: "string",
    title: "Accessible Video Title",
  },
  {
    name: "poster",
    type: "image",
    title: "Preview Image",
    options: { hotspot: true },
  }],
  preview: {
    select: {
      url: 'url'
    },
  },
  components: {
    preview: Preview
  },
}
