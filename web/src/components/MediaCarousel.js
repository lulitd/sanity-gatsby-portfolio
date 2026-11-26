import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button } from "theme-ui";
import { alpha } from "@theme-ui/color";
import { createPortal } from "react-dom";
import ReactPlayer from "react-player";
import MotionClip from "./atoms/motionClip";
import Icon from "./icon";

const clampIndex = (index, length) => ((index % length) + length) % length;
const isVideo = (item) => ["video", "youtube", "vimeo"].includes(item.type);
const isMotionClip = (item) => item.type === "motionClip";
const isPlayableMedia = (item) => isVideo(item) || isMotionClip(item);

function youtubeThumbnail(url) {
  if (typeof url !== "string") return null;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    let id = null;
    if (host === "youtu.be") id = parsed.pathname.split("/")[1];
    else if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      if (parsed.pathname === "/watch") id = parsed.searchParams.get("v");
      else id = parsed.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/]+)/)?.[1];
    }
    return id && /^[\w-]{11}$/.test(id) ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}

function thumbnailFor(item) {
  // Explicit thumbnail wins; older poster fields continue to work.
  if (item.thumbnail) return item.thumbnail;
  if (item.type === "image") return item.thumbnailSrc || item.src;
  if (isMotionClip(item)) return item.thumbnailSrc || item.poster;
  if (item.poster) return item.poster;
  return youtubeThumbnail(item.src);
}

function PreviewVideo({ source, poster, onVideoPlay, onVideoPause }) {
  const [activated, setActivated] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        bg: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {!activated ? (
        <Box
          as="button"
          type="button"
          onClick={() => setActivated(true)}
          aria-label="Play video"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
            p: 0,
            bg: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            "&:focus-visible": {
              outline: "3px solid",
              outlineColor: "primary",
              outlineOffset: -3,
            },
          }}
        >
          {poster && (
            <Box
              as="img"
              src={poster}
              alt=""
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          )}

          <Box
            as="span"
            aria-hidden="true"
            sx={{
              position: "absolute",
              width: "64px",
              height: "44px",
              borderRadius: "12px",
              bg: "#ff0033",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            ▶
          </Box>
        </Box>
      ) : (
        <ReactPlayer
          url={source}
          playing={true}
          controls
          playsinline
          onPlay={onVideoPlay}
          onPause={onVideoPause}
          onEnded={onVideoPause}
          light={false}
          width="100%"
          height="100%"
        />
      )}
    </Box>
  );
}

function Media({ item, active, fullscreen = false, onImageClick, onVideoPlay, onVideoPause }) {
  const commonSx = { width: "100%", height: "100%", objectFit: "contain", display: "block" };

  if (item.type === "image") {
    const image = (
      <Box
        as="img"
        src={fullscreen ? item.fullSrc || item.src : item.src}
        alt={item.alt || ""}
        loading={active ? "eager" : "lazy"}
        sx={commonSx}
      />
    );
    if (!onImageClick) return image;
    return (
      <Box
        as="button"
        type="button"
        onClick={onImageClick}
        aria-label={`Enlarge image: ${item.alt || item.caption || "carousel image"}`}
        tabIndex={active ? 0 : -1}
        sx={{
          border: 0,
          bg: "transparent",
          p: 0,
          width: "100%",
          height: "100%",
          cursor: "zoom-in",
          display: "block",
          "&:focus-visible": { outline: "3px solid", outlineColor: "primary", outlineOffset: -4 },
        }}
      >
        {image}
      </Box>
    );
  }

  if (isMotionClip(item)) {
    // Like embedded videos, only mount the active clip.
    if (!active) return null;

    const interactive = item.playbackMode !== "autoplay";

    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <MotionClip
          src={item.src}
          poster={item.poster}
          playbackMode={item.playbackMode}
          loop={item.loop}
          resetOnLeave={item.resetOnLeave}
          aspectRatio={item.aspectRatio}
          description={item.description}
          audio={item.audio ?? false}
          volume={item.volume ?? 0.1}
          active={active}
          inGallery
          onPlaybackChange={(playing) => {
            // Only user-initiated clips pause slide cycling.
            // Autoplay loops should not hold the carousel.
            if (!interactive) return;

            if (playing) {
              onVideoPlay?.();
            } else {
              onVideoPause?.();
            }
          }}
        />
      </Box>
    );
  }

  if (isVideo(item)) {
    // Only mount the active player; changing slides unmounts it and stops playback.
    if (!active) return null;
    const sources = item.sources?.length ? item.sources : null;
    const source = item.src || (sources ? sources.map(({ src, type }) => ({ src, type })) : null);

    const previewUrl = thumbnailFor(item);

    if (!source)
      return (
        <Box role="status" sx={{ p: 3 }}>
          Video URL missing.
        </Box>
      );
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& video, & iframe": { maxWidth: "100%", maxHeight: "100%" },
          "& .react-player__preview": {
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          },
        }}
      >
        <PreviewVideo
          source={source}
          poster={thumbnailFor(item)}
          onVideoPlay={onVideoPlay}
          onVideoPause={onVideoPause}
        />
      </Box>
    );
  }

  return (
    <Box role="status" sx={{ p: 3 }}>
      Unsupported media item.
    </Box>
  );
}

/**
 * items:
 *   { type: 'image', src, alt?, caption?, thumbnail? }
 *   { type: 'video', src?, sources?: [{src,type}], poster?, title?, caption?, thumbnail? }
 *   { type: 'youtube'|'vimeo', src, poster?, title?, caption?, thumbnail? }
 *
 * variant: 'default' (existing counter/progress/arrows) | 'thumbnails'
 * autoCycle: opt-in slide advancement; videos never automatically start playing.
 * autoCycleInterval: time per slide in milliseconds (default 5000, minimum 1000).
 * While a video is actively playing, advancement pauses until playback pauses or ends.
 * thumbnailWidth: pixel width of each thumbnail (defaults to 104)
 * thumbnailAspectRatio: CSS aspect ratio for thumbnails (defaults to '4 / 3')
 * height: optional Theme UI responsive height; overrides aspectRatio inline.
 * YouTube thumbnails are inferred from standard URLs. For Vimeo or local videos
 * without poster artwork, provide item.poster or item.thumbnail for an image.
 */
export default function MediaCarousel({
  items = [],
  ariaLabel = "Project media",
  aspectRatio = "16 / 9",
  background = "#1a1a1a",
  showCaptions = true,
  height,
  initialIndex = 0,
  variant = "default",
  thumbnailWidth = 104,
  thumbnailAspectRatio = "4 / 3",
  autoCycle = false,
  autoCycleInterval = 5000,
  transitionLength = 1000,
}) {
  const [index, setIndex] = useState(() =>
    items.length ? clampIndex(initialIndex, items.length) : 0,
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [cyclePlaying, setCyclePlaying] = useState(Boolean(autoCycle));
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [portalReady, setPortalReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const launchRef = useRef(null);
  const touchStart = useRef(null);
  const thumbnailRefs = useRef([]);
  const current = items[index];
  const total = items.length;
  const thumbnailsEnabled = variant === "thumbnails";
  const validInterval = Number.isFinite(autoCycleInterval)
    ? Math.max(1000, autoCycleInterval)
    : 5000;

  // The prop controls feature availability; users can pause/resume independently.
  useEffect(() => {
    setCyclePlaying(Boolean(autoCycle));
  }, [autoCycle]);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  // Avoid cutting off a user-initiated video. Reset when the selected media changes.
  useEffect(() => {
    setVideoPlaying(false);
  }, [index, lightboxOpen]);

  // A new timer is scheduled on each slide, rather than accumulating intervals.
  // The timer does not play videos; it only changes the active slide.
  useEffect(() => {
    if (!autoCycle || !cyclePlaying || videoPlaying || !pageVisible || total < 2) return;
    const timer = window.setTimeout(() => {
      setIndex((previous) => clampIndex(previous + 1, total));
    }, validInterval);
    return () => window.clearTimeout(timer);
  }, [autoCycle, cyclePlaying, videoPlaying, pageVisible, total, index, validInterval]);

  const toggleCycle = () => setCyclePlaying((playing) => !playing);

  function cycleControl() {
    if (!autoCycle) return null;
    const playing = cyclePlaying;
    return (
      <Button
        type="button"
        variant="nav"
        onClick={toggleCycle}
        aria-label={
          playing ? "Pause automatic slide advancement" : "Play automatic slide advancement"
        }
        aria-pressed={playing}
        title={playing ? "Pause slideshow" : "Play slideshow"}
        sx={{ minWidth: "36px", fontSize: 16 }}
      >
        <Icon symbol={playing ? "pause" : "play"} />
      </Button>
    );
  }

  useEffect(() => {
    setPortalReady(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    if (mq.matches) setCyclePlaying(false);
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (total && index >= total) setIndex(total - 1);
  }, [index, total]);

  useEffect(() => {
    if (!thumbnailsEnabled || lightboxOpen) return;
    // Only scroll the strip, not the whole document.
    const thumb = thumbnailRefs.current[index];
    const strip = thumb?.parentElement;
    if (!thumb || !strip) return;
    const thumbRect = thumb.getBoundingClientRect();
    const stripRect = strip.getBoundingClientRect();
    if (thumbRect.left < stripRect.left) {
      strip.scrollTo({
        left: strip.scrollLeft + thumbRect.left - stripRect.left,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    } else if (thumbRect.right > stripRect.right) {
      strip.scrollTo({
        left: strip.scrollLeft + thumbRect.right - stripRect.right,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  }, [index, lightboxOpen, reduceMotion, thumbnailsEnabled]);

  const navigate = useCallback(
    (delta) => {
      if (!total) return;
      setIndex((prev) => clampIndex(prev + delta, total));
    },
    [total],
  );

  const openLightbox = useCallback(() => {
    launchRef.current = document.activeElement;
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    requestAnimationFrame(() => launchRef.current?.focus?.());
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function handleModalKey(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }
      const insidePlayer = event.target.closest?.("iframe, video, .react-player__preview");
      if (!insidePlayer && event.key === "ArrowRight") {
        event.preventDefault();
        navigate(1);
      }
      if (!insidePlayer && event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(-1);
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusables = [
          ...dialogRef.current.querySelectorAll(
            'button:not([disabled]), video[controls], iframe, a[href], [tabindex]:not([tabindex="-1"])',
          ),
        ].filter((el) => el.getClientRects().length);
        if (!focusables.length) {
          event.preventDefault();
          dialogRef.current.focus();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!dialogRef.current.contains(document.activeElement)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", handleModalKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleModalKey);
    };
  }, [lightboxOpen, closeLightbox, navigate]);

  function handleTouchStart(event) {
    const t = event.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function handleTouchEnd(event) {
    if (!touchStart.current || !event.changedTouches.length) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) navigate(dx < 0 ? 1 : -1);
  }

  function handleInlineKey(event) {
    if (lightboxOpen || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target.closest?.("iframe, video, .react-player__preview")) return;
    // On thumbnail buttons, allow native button behavior and don't steal their arrow keys.
    if (event.target.closest?.('[data-carousel-thumbnail="true"]')) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      navigate(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(-1);
    }
  }

  if (!total) return null;

  function stage(mode) {
    const inline = mode === "inline";
    return (
      <Box
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: !inline || height != null ? "auto" : aspectRatio,
          height: inline ? (height ?? "auto") : "min(75vh, 850px)",
          bg: background,
          overflow: "hidden",
          borderRadius: inline ? 2 : 0,
        }}
      >
        {items.map((item, i) => {
          const active = index === i;
          // Only the current video should be mounted, even with a lightbox open.
          if (inline && lightboxOpen && isPlayableMedia(item)) return null;
          return (
            <Box
              key={item.id || `${item.src || item.title || item.type}-${i}`}
              aria-hidden={!active}
              sx={{
                position: "absolute",
                inset: 0,
                opacity: active ? 1 : 0,
                pointerEvents: active ? "auto" : "none",
                visibility: active ? "visible" : "hidden",
                transition: reduceMotion
                  ? "none"
                  : active
                    ? `opacity ${transitionLength}ms ease, visibility 0s`
                    : `opacity ${transitionLength}ms ease, visibility 0s linear ${transitionLength}ms`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Media
                item={item}
                active={active && (!inline || !lightboxOpen)}
                fullscreen={!inline}
                onImageClick={inline ? openLightbox : undefined}
                onVideoPlay={() => setVideoPlaying(true)}
                onVideoPause={() => setVideoPlaying(false)}
              />
            </Box>
          );
        })}
      </Box>
    );
  }

  function controls(inModal = false) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, pt: 3, width: "100%" }}>
        <Box
          as="span"
          aria-label={`Slide ${index + 1} of ${total}`}
          sx={{
            fontFamily: "monospace",
            fontSize: 1,
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </Box>
        <Box
          role="progressbar"
          aria-label="Carousel progress"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
          sx={{ flex: 1, height: 3, bg: "secondary700", position: "relative", overflow: "hidden" }}
        >
          <Box
            sx={{
              height: "100%",
              bg: "primary",
              width: `${((index + 1) / total) * 100}%`,
              transition: reduceMotion ? "none" : `width ${transitionLength}ms ease`,
            }}
          />
        </Box>
        {cycleControl()}
        {!inModal && (
          <Button
            type="button"
            onClick={openLightbox}
            aria-label="Open fullscreen media"
            variant="nav"
            sx={{ fontSize: 17 }}
            title="Open fullscreen"
          >
            <Icon symbol="fullscreen" />
          </Button>
        )}
        <Button
          type="button"
          variant="nav"
          onClick={() => navigate(-1)}
          aria-label="Previous slide"
        >
          <Icon symbol="backward" />
        </Button>
        <Button type="button" variant="nav" onClick={() => navigate(1)} aria-label="Next slide">
          <Icon symbol="forward" />
        </Button>
      </Box>
    );
  }

  function thumbnails() {
    return (
      <Box
        as="div"
        role="group"
        aria-label="Choose media"
        sx={{
          display: "flex",
          gap: 2,
          width: "100%",
          minWidth: 0,
          overflowX: "auto",
          overflowY: "hidden",
          pt: 2,
          pb: 2,
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((item, i) => {
          const selected = i === index;
          const thumbnail = thumbnailFor(item);
          const label =
            item.title || item.alt || item.caption || (isPlayableMedia(item) ? "Video" : "Image");
          return (
            <Box
              as="button"
              type="button"
              key={item.id || `${item.src || item.title || item.type}-thumb-${i}`}
              ref={(element) => {
                thumbnailRefs.current[i] = element;
              }}
              data-carousel-thumbnail="true"
              onClick={() => setIndex(i)}
              aria-label={`Show media ${i + 1} of ${total}: ${label}`}
              aria-current={selected ? "true" : undefined}
              sx={{
                position: "relative",
                flex: "0 0 auto",
                width: thumbnailWidth,
                aspectRatio: thumbnailAspectRatio,
                bg: background,
                p: 0,
                cursor: "pointer",
                border: "2px solid",
                borderColor: selected ? "primary" : "transparent",
                borderRadius: 1,
                overflow: "hidden",
                opacity: selected ? 1 : 0.7,
                transition: reduceMotion ? "none" : "opacity 180ms ease, border-color 180ms ease",
                "&:hover": { opacity: 1 },
                "&:focus-visible": {
                  outline: "3px solid",
                  outlineColor: "primary",
                  outlineOffset: 2,
                  opacity: 1,
                },
              }}
            >
              {thumbnail ? (
                <Box
                  as="img"
                  src={thumbnail}
                  alt=""
                  loading="lazy"
                  sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <Box
                  aria-hidden="true"
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "primary900",
                    fontSize: 70,
                  }}
                >
                  <Icon symbol={isPlayableMedia(item) ? "video" : "picture"} />
                </Box>
              )}
              {isPlayableMedia(item) && (
                <Box
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    textShadow: "0 1px 4px #000",
                    fontSize: 26,
                  }}
                >
                  <Icon symbol="play" />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    );
  }

  function caption() {
    return showCaptions && current?.caption ? (
      <Box as="p" sx={{ p: 2, mt: 2, mb: 0, fontSize: 1, color: "text", lineHeight: "body" }}>
        {current.caption}
      </Box>
    ) : null;
  }

  return (
    <Box
      as="section"
      aria-label={ariaLabel}
      onKeyDown={handleInlineKey}
      sx={{ width: "100%", minWidth: 0 }}
    >
      {stage("inline")}
      {controls()}
      {thumbnailsEnabled && thumbnails()}
      {caption()}
      {portalReady &&
        lightboxOpen &&
        createPortal(
          <Box
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${ariaLabel} — fullscreen`}
            tabIndex={-1}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              bg: "background",
              color: "text",
              overflowY: "auto",
              p: [3, 4],
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto" }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", pb: 2 }}>
                <Button
                  ref={closeRef}
                  variant="nav"
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close fullscreen"
                >
                  <Icon symbol="close" />
                </Button>
              </Box>
              {stage("lightbox")}
              {controls(true)}
              {caption()}
            </Box>
          </Box>,
          document.body,
        )}
    </Box>
  );
}
