import React from 'react';
import ReactPlayer from 'react-player'
// import getYouTubeId from 'get-youtube-id'
// import YouTube from 'react-youtube'

const Preview = ({value}) => {
	const { url } = value
	return (<ReactPlayer url={url} />)
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
        component: Preview
    }
  }