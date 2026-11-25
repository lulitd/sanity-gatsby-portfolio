import React from "react";
import ReactPlayer from "react-player";

export default function VideoBlockPreview(props) {
  const { value, renderDefault } = props;
  const url = value?.url;

  return renderDefault({
    ...props,
    renderPreview: () => (
      <div style={{ padding: "8px 0" }}>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>{value?.title || "Video Embed"}</div>

        {url ? (
          <div style={{ aspectRatio: "16 / 9" }}>
            <ReactPlayer
              url={url}
              controls
              playing={false}
              light={value?.poster?.asset ? true : undefined}
              width="100%"
              height="100%"
            />
          </div>
        ) : (
          <div>Missing Video URL</div>
        )}
      </div>
    ),
  });
}
