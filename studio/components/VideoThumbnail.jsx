import React, { useEffect, useState } from "react";
import { Box, Text } from "@sanity/ui";
import { useClient } from "sanity";
import imageUrlBuilder from "@sanity/image-url";

function getYouTubeThumbnail(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");

    let id = null;

    if (host === "youtu.be") {
      id = parsed.pathname.split("/")[1];
    } else if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v");
      } else {
        id = parsed.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/]+)/)?.[1];
      }
    }

    if (!id || !/^[\w-]{11}$/.test(id)) {
      return null;
    }

    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  } catch {
    return null;
  }
}

function isVimeoUrl(url) {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");

    return host === "vimeo.com" || host.endsWith(".vimeo.com");
  } catch {
    return false;
  }
}

export default function VideoThumbnail({ url, poster }) {
  const client = useClient({ apiVersion: "2025-01-01" });
  const [remoteThumbnail, setRemoteThumbnail] = useState(null);
  const [imageFailed, setImageFailed] = useState(false);

  const posterUrl = poster?.asset
    ? imageUrlBuilder(client).image(poster).width(640).fit("max").url()
    : null;

  const youtubeUrl = getYouTubeThumbnail(url);

  useEffect(() => {
    setRemoteThumbnail(null);
    setImageFailed(false);

    if (posterUrl || youtubeUrl || !isVimeoUrl(url)) {
      return;
    }

    const controller = new AbortController();

    const endpoint = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`;

    fetch(endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Thumbnail unavailable");
        }
        return response.json();
      })
      .then((data) => {
        setRemoteThumbnail(data.thumbnail_url || null);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setRemoteThumbnail(null);
        }
      });

    return () => controller.abort();
  }, [url, posterUrl, youtubeUrl]);

  const src = posterUrl || youtubeUrl || remoteThumbnail;

  return (
    <Box
      style={{
        width: "120px",
        height: "72px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "4px",
        background: "#222",
      }}
    >
      {src && !imageFailed ? (
        <img
          src={src}
          alt=""
          onError={() => setImageFailed(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <Box
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text size={1} style={{ color: "#fff" }}>
            Video
          </Text>
        </Box>
      )}

      <Box
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            color: "#fff",
            fontSize: "18px",
            textShadow: "0 1px 5px #000",
          }}
        >
          ▶
        </span>
      </Box>
    </Box>
  );
}
