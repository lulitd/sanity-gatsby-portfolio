import { Box, Button } from "theme-ui";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReactPlayer from "react-player";

const clampIndex = (index, length) => ((index % length) + length) % length;
const isVideo = (item) => ["video", "youtube", "vimeo"].includes(item.type);

function Media({ item, active, onImageClick }) {
  const commonSx = { width: "100%", height: "100%", objectFit: "contain", display: "block" };
  if (item.type === "image") {
    return (
      <Box
        as="button"
        type="button"
        onClick={onImageClick}
        aria-label={
          onImageClick
            ? `Enlarge image: ${item.alt || item.caption || "carousel image"}`
            : undefined
        }
        sx={{
          border: 0,
          bg: "transparent",
          p: 0,
          width: "100%",
          height: "100%",
          cursor: onImageClick ? "zoom-in" : "default",
          display: "block",
          "&:focus-visible": { outline: "3px solid", outlineColor: "primary", outlineOffset: -4 },
        }}
      >
        <Box
          as="img"
          src={item.src}
          alt={item.alt || ""}
          loading={active ? "eager" : "lazy"}
          sx={commonSx}
        />
      </Box>
    );
  }
  if (isVideo(item)) {
    // Only mount the active player. Unmounting stops local files and provider embeds.
    if (!active) return null;
    const sources = item.sources?.length ? item.sources : null;
    const source = item.src || (sources ? sources.map(({ src, type }) => ({ src, type })) : null);
    if (!source)
      return (
        <Box role="status" sx={{ color: "text", p: 3 }}>
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
            backgroundSize: "contain !important",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          },
        }}
      >
        <ReactPlayer
          url={source}
          playing={false}
          controls
          playsInline
          light={item.poster || (["youtube", "vimeo"].includes(item.type) ? true : false)}
          width="100%"
          height="100%"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Box>
    );
  }
  return (
    <Box role="status" sx={{ color: "text", p: 3 }}>
      Unsupported media item.
    </Box>
  );
}

/**
 * items: {type:'image',src,alt?,caption?} |
 *        {type:'video',src?,sources?:[{src,type}],poster?,caption?} |
 *        {type:'youtube'|'vimeo',src, title?,caption?} |
 *        {type:'video',src,poster?,title?,caption?} // YouTube/Vimeo URLs also work
 * height: optional Theme UI responsive height, e.g. ["260px", "400px", "540px"].
 *         When set, takes precedence over aspectRatio for the inline carousel.
 */
export default function MediaCarousel({
  items = [],
  ariaLabel = "Project media",
  aspectRatio = "16 / 9",
  background = "#1a1a1a",
  showCaptions = true,
  height,
  initialIndex = 0,
}) {
  const [index, setIndex] = useState(() =>
    items.length ? clampIndex(initialIndex, items.length) : 0,
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const launchRef = useRef(null);
  const touchStart = useRef(null);
  const current = items[index];
  const total = items.length;

  useEffect(() => {
    setPortalReady(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (total && index >= total) setIndex(total - 1);
  }, [index, total]);

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
    // Restore focus once dialog is removed from the tree.
    requestAnimationFrame(() => launchRef.current?.focus?.());
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function handleModalKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      }
      // Let embedded players and their native controls handle their own arrow keys.
      const insidePlayer = e.target.closest?.("iframe, video, .react-player__preview");
      if (!insidePlayer && e.key === "ArrowRight") {
        e.preventDefault();
        navigate(1);
      }
      if (!insidePlayer && e.key === "ArrowLeft") {
        e.preventDefault();
        navigate(-1);
      }
      if (e.key === "Tab") {
        const focusables = [
          ...dialogRef.current.querySelectorAll(
            'button:not([disabled]), video[controls], iframe, a[href], [tabindex]:not([tabindex="-1"])',
          ),
        ].filter((el) => el.getClientRects().length);
        if (!focusables.length) {
          e.preventDefault();
          dialogRef.current.focus();
          return;
        }
        const first = focusables[0],
          last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
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
    return (
      <Box
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: mode === "lightbox" || height != null ? "auto" : aspectRatio,
          height: mode === "lightbox" ? "min(75vh, 850px)" : (height ?? "auto"),
          bg: background,
          overflow: "hidden",
          borderRadius: mode === "lightbox" ? 0 : 2,
        }}
      >
        {items.map((item, i) => {
          const active = index === i;
          // While fullscreen, don't keep a second copy of the player alive behind the dialog.
          if (mode === "inline" && lightboxOpen && isVideo(item)) return null;
          return (
            <Box
              key={item.id || `${item.src || item.title}-${i}`}
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
                    ? "opacity 280ms ease, visibility 0s"
                    : "opacity 280ms ease, visibility 0s linear 280ms",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Media
                item={item}
                active={active && (mode === "lightbox" || !lightboxOpen)}
                onImageClick={mode === "inline" ? openLightbox : undefined}
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
              transition: reduceMotion ? "none" : "width 280ms ease",
            }}
          />
        </Box>
        {!inModal && (
          <Button
            type="button"
            onClick={openLightbox}
            aria-label="Open fullscreen media"
            variant="nav"
            sx={{ fontSize: 17 }}
            title="Open fullscreen"
          >
            ⛶
          </Button>
        )}
        <Button
          type="button"
          variant="nav"
          onClick={() => navigate(-1)}
          aria-label="Previous slide"
        >
          ‹
        </Button>
        <Button type="button" variant="nav" onClick={() => navigate(1)} aria-label="Next slide">
          ›
        </Button>
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
              zIndex: 9999,
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
                  ×
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
