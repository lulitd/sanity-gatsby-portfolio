import React from "react";
import { Box, Heading, Text } from "theme-ui";
import MediaCarousel from "../MediaCarousel";
import { imageUrlFor } from "../../lib/image-url";
import { buildImageObj } from "../../lib/helpers";

const IMAGE_SIZES = {
  thumbnail: 160,
  standard: 800,
  fullscreen: 2048,
};

const getImageUrl = (image, width, quality = 80) => {
  return imageUrlFor(image).width(width).fit("max").quality(quality).auto("format").url();
};

// Convert Sanity media objects into carousel items
const normalizeSlides = (slides = []) => {
  return slides
    .map((slide) => {
      if (slide._type === "figure") {
        if (!slide.asset?._ref && !slide.asset?._id) {
          return null;
        }
        const image = buildImageObj(slide);
        return {
          type: "image",

          src: getImageUrl(image, IMAGE_SIZES.standard),

          thumbnailSrc: getImageUrl(image, IMAGE_SIZES.thumbnail, 75),

          fullSrc: getImageUrl(image, IMAGE_SIZES.fullscreen, 85),

          alt: slide.alt || "",
          caption: slide.caption,
        };
      }

      if (slide._type === "video") {
        if (!slide.url) return null;

        return {
          type: "video",
          src: slide.url,
          title: slide.title || "Embedded video",
          caption: slide.caption,
          poster: slide.poster?.asset?.url,
        };
      }

      if (slide._type === "motionClip") {
        const src = slide.clip?.asset?.url;

        if (!src) return null;

        const poster = slide.poster?.asset ? buildImageObj(slide.poster) : null;

        return {
          type: "motionClip",
          src,

          poster: poster ? getImageUrl(poster, IMAGE_SIZES.standard) : null,

          thumbnailSrc: poster ? getImageUrl(poster, IMAGE_SIZES.thumbnail, 75) : null,

          caption: slide.caption,
          description: slide.description,

          playbackMode: slide.playbackMode || "autoplay",
          loop: slide.loop ?? false,
          resetOnLeave: slide.resetOnLeave ?? true,
          aspectRatio: slide.aspectRatio || "auto",
        };
      }

      return null;
    })
    .filter(Boolean);
};

const SanityMediaCarousel = ({
  value,
  height = ["300px", "450px", "560px"],
  background = "#111",
  ...props
}) => {
  if (!value) return null;

  const items = normalizeSlides(value.slides);
  if (!items.length) return null;

  const {
    heading,
    caption,
    ariaLabel,
    carouselLayout = "default",
    autoCycle = false,
    autoCycleInterval = 5000,
    transitionLength = 1000,
  } = value;

  return (
    <Box
      className="project-carousel"
      sx={{
        width: "100%",
        minWidth: 0,
        my: 6,
      }}
    >
      {heading && (
        <Heading as="h3" sx={{ mb: 3 }}>
          {heading}
        </Heading>
      )}

      <MediaCarousel
        items={items}
        height={height}
        background={background}
        ariaLabel={ariaLabel || heading || "Project media gallery"}
        autoCycle={autoCycle}
        autoCycleInterval={autoCycleInterval}
        transitionLength={transitionLength}
        variant={carouselLayout}
        {...props}
      />

      {caption && (
        <Text
          as="p"
          sx={{
            mt: 3,
            mb: 0,
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

export default SanityMediaCarousel;
