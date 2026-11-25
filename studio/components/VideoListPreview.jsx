import React from "react";
import VideoThumbnail from "./VideoThumbnail";

export default function VideoListPreview(props) {
  const { url, title, caption, poster, renderDefault } = props;

  return renderDefault({
    ...props,
    title: title || "Video Embed",
    subtitle: caption || url || "Missing Video URL",
    media: <VideoThumbnail url={url} poster={poster} />,
  });
}
