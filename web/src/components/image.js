import React from "react";
import { Box } from "theme-ui";
import { GatsbyImage } from "gatsby-plugin-image";
import { motion } from "framer-motion";

const variants = {
  hero: { layout: "full", imgStyle: { objectFit: "cover" } },
  thumb: { layout: "constrained", imgStyle: { objectFit: "cover" } },
  cover: { layout: "fixed", imgStyle: { objectFit: "cover" } },
  logo: { layout: "fixed", imgStyle: { objectFit: "contain" } },
};

export default function SanityImage({ image, variant = "thumb", imgStyle, sx, ...props }) {
  if (!image?.asset) return null;

  if (!image.asset.gatsbyImageData) {
    console.warn("Missing gatsbyImageData for image:", image);
    return null; // or fallback <img>
  }

  const config = variants[variant];

  return (
    <GatsbyImage
      image={image.asset.gatsbyImageData}
      alt={image.asset.altText || ""}
      layout={config.layout}
      imgStyle={{
        width: "100%",
        height: "100%",
        objectFit: config.imgStyle.objectFit,
        objectPosition: image?.hotspot
          ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
          : "50% 50%",
        ...imgStyle,
      }}
      {...props}
    />
  );
}
