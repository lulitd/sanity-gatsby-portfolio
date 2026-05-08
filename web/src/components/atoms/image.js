import React from "react";
import { Box } from "theme-ui";
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";
import { motion } from "framer-motion";
import clientConfig from "../../../client-config";

const variants = {
  hero: { layout: "full", imgStyle: { objectFit: "cover" } },
  thumb: { layout: "constrained", imgStyle: { objectFit: "cover" } },
  cover: { layout: "fixed", imgStyle: { objectFit: "cover" } },
  logo: { layout: "fixed", imgStyle: { objectFit: "contain" } },
};

function imageDataFromAssetId(assetId) {
  const imageData = getGatsbyImageData(assetId, { maxWidth: 600 }, { ...clientConfig.sanity });

  return imageData;
}

export default function SanityImage({ image, assetId, variant = "thumb", imgStyle, sx, ...props }) {
  if (!image?.asset && !assetId) return null;

  // if (!image.asset.gatsbyImageData) {
  //   console.warn("Missing gatsbyImageData for image:", image);
  //   return null; // or fallback <img>
  // }

  let imageData = image ? image.asset.gatsbyImageData : imageDataFromAssetId(assetId);

  const config = variants[variant];

  return (
    <GatsbyImage
      image={imageData}
      alt={image?.asset.altText || ""}
      layout={config.layout}
      imgStyle={{
        width: "100%",
        height: "100%",
        objectFit: config.imgStyle.objectFit,
        objectPosition: image?.hotspot
          ? `${image?.hotspot.x * 100}% ${image?.hotspot.y * 100}%`
          : "50% 50%",
        ...imgStyle,
      }}
      {...props}
    />
  );
}
