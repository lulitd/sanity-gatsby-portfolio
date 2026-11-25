import React from 'react'
import VideoBlockPreview from "../../components/VideoBlockPreview"
import VideoListPreview from "../../components/VideoListPreview";

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
    block: VideoBlockPreview,
    preview: VideoListPreview,
  },
}
