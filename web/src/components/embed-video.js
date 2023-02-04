import React from "react";
import { FaAutoprefixer } from "react-icons/fa";
import ReactPlayer from "react-player";
import { AspectRatio } from "theme-ui";
function EmbedVideo({ url, ratio = 16 / 9 }) {
  return (
    <AspectRatio ratio={ratio} sx={{
      width:["100%"],
      maxWidth:["videoS","videoM","videoL"],
    }}>
      <ReactPlayer url={url} width="100%" height="100%" controls />
    </AspectRatio>
  );
}

export default EmbedVideo;
