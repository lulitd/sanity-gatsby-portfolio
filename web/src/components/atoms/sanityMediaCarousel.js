import React from "react";
import { Box, Heading, Text } from "theme-ui";
import MediaCarousel from "../MediaCarousel";

// Convert Sanity media objects into carousel items
const normalizeSlides = (slides = []) => {
  return slides
    .map((slide) => {
      if (slide._type === "figure") {
        const src = slide.asset?.url;

        if (!src) return null;

        return {
          type: "image",
          src,
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

  return (
    <Box
      className="project-carousel"
      sx={{
        width: "100%",
        minWidth: 0,
        my: 6,
      }}
    >
      {value.heading && (
        <Heading as="h3" sx={{ mb: 3 }}>
          {value.heading}
        </Heading>
      )}

      <MediaCarousel
        items={items}
        height={height}
        background={background}
        ariaLabel={value.ariaLabel || value.heading || "Project media gallery"}
        {...props}
      />

      {value.caption && (
        <Text
          as="p"
          sx={{
            mt: 3,
            mb: 0,
            fontSize: 1,
            color: "textMuted",
          }}
        >
          {value.caption}
        </Text>
      )}
    </Box>
  );
};

export default SanityMediaCarousel;
