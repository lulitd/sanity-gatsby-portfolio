import React, { useEffect, useRef, useState } from "react";
import { Box, Text } from "theme-ui";
import Icon from "../icon";

const MotionClip = ({
  src,
  poster,
  playbackMode = "autoplay",
  loop = false,
  resetOnLeave = true,
  caption,
  description,
  aspectRatio = "auto",
  active = true,
  inGallery = false,
  onPlaybackChange,
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [inView, setInView] = useState(false);
  const [nearView, setNearView] = useState(false);
  const [hasSource, setHasSource] = useState(false);
  const [requestedPlay, setRequestedPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [autoOverride, setAutoOverride] = useState(null);

  const isAutoplay = playbackMode === "autoplay";
  const isHover = playbackMode === "hover";
  const shouldLoop = isAutoplay || loop;

  // Respect system motion preferences.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener?.("change", update);

    return () => media.removeEventListener?.("change", update);
  }, []);

  // Observe visibility and proximity independently.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const nearObserver = new IntersectionObserver(([entry]) => setNearView(entry.isIntersecting), {
      rootMargin: "200px",
    });

    const viewObserver = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });

    nearObserver.observe(node);
    viewObserver.observe(node);

    return () => {
      nearObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  // Autoplay videos may load as they approach the viewport.
  useEffect(() => {
    if (isAutoplay && active && nearView && !reducedMotion) {
      setHasSource(true);
    }
  }, [isAutoplay, active, nearView, reducedMotion]);

  const autoEnabled = autoOverride ?? !reducedMotion;

  const shouldPlay = active && inView && (isAutoplay ? autoEnabled : requestedPlay);

  // Synchronize browser playback with React state.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasSource) return;

    if (shouldPlay) {
      const playPromise = video.play();

      if (playPromise?.catch) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      video.pause();
    }
  }, [shouldPlay, hasSource]);

  const startPlayback = () => {
    setHasSource(true);
    setRequestedPlay(true);
  };

  const stopPlayback = () => {
    setRequestedPlay(false);

    if (resetOnLeave && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const togglePlayback = () => {
    if (isAutoplay) {
      setHasSource(true);
      setAutoOverride(!shouldPlay);
      return;
    }

    if (shouldPlay) {
      setRequestedPlay(false);
    } else {
      startPlayback();
    }
  };

  if (!src) return null;

  const label = description || caption || "Motion clip";

  return (
    <Box
      as="figure"
      ref={containerRef}
      className="motion-clip"
      onPointerEnter={(event) => {
        if (isHover && event.pointerType !== "touch") {
          startPlayback();
        }
      }}
      onPointerLeave={() => {
        if (isHover) stopPlayback();
      }}
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        height: inGallery ? "100%" : "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        m: 0,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: inGallery ? "100%" : "auto",
          minHeight: 0,
          overflow: "hidden",
          bg: "muted",
        }}
      >
        <video
          ref={videoRef}
          src={hasSource ? src : undefined}
          poster={poster}
          muted
          playsInline
          preload="none"
          loop={shouldLoop}
          aria-label={label}
          onPlay={() => {
            setIsPlaying(true);
            onPlaybackChange?.(true);
          }}
          onPause={() => {
            setIsPlaying(false);
            onPlaybackChange?.(false);
          }}
          onEnded={() => {
            setIsPlaying(false);
            setRequestedPlay(false);
            onPlaybackChange?.(false);
          }}
          style={{
            display: "block",
            width: "100%",

            height: inGallery ? "100%" : "auto",

            aspectRatio: inGallery ? "auto" : aspectRatio,

            objectFit: "contain",
            backgroundColor: "#111",
          }}
        />

        <Box
          as="button"
          type="button"
          aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
          onClick={togglePlayback}
          onFocus={() => {
            if (isHover) startPlayback();
          }}
          onBlur={() => {
            if (isHover) stopPlayback();
          }}
          sx={{
            position: "absolute",
            cursor: "pointer",
            border: 0,
            color: "#fff",
            bg: "rgba(0, 0, 0, 0.65)",
            borderRadius: "4px",
            p: 2,
            fontSize: 1,

            ...(isAutoplay
              ? {
                  right: 2,
                  bottom: 2,
                }
              : {
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bg: "transparent",
                  "&:hover span, &:focus-visible span": {
                    bg: "rgba(0, 0, 0, 0.85)",
                  },
                }),

            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary",
              outlineOffset: "-2px",
            },
          }}
        >
          <Box
            as="span"
            sx={{
              bg: isAutoplay ? "transparent" : "rgba(0, 0, 0, 0.65)",
              borderRadius: "4px",
              px: 2,
              py: 1,
            }}
          >
            <Icon symbol={isPlaying ? "pause" : "play"} />
          </Box>
        </Box>
      </Box>

      {caption && (
        <Text
          as="figcaption"
          sx={{
            mt: 2,
            fontSize: 1,
            color: "textMuted",
          }}
        >
          {caption}
        </Text>
      )}
    </Box>
  );
};

export default MotionClip;
