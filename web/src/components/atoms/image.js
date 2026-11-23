import React from "react";
import { Box } from "theme-ui";
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";
import clientConfig from "../../../client-config";

const variants = {
  hero: { layout: "full", width: 2000, imgStyle: { objectFit: "cover" } },
  thumb: { layout: "constrained", width: 800, imgStyle: { objectFit: "cover" } },
  cover: { layout: "constrained", width: 1200, imgStyle: { objectFit: "cover" } },
  logo: { layout: "fixed", width: 250, imgStyle: { objectFit: "contain" } },
};

function imageDataFromAssetId(assetId, config, width) {
  if (!assetId) return null;

  const options =
    config.layout === "fullWidth"
      ? {
          layout: "fullWidth",
          breakpoints: [400, 800, 1200, 1600, width],
        }
      : {
          layout: config.layout,
          width,
        };

  return getGatsbyImageData(assetId, options, clientConfig.sanity);
}

export default function SanityImage({
  image,
  assetId,
  variant = "thumb",
  width,
  regenerate = false,
  imgStyle,
  sx,
  fill = false,
  ...props
}) {
  const config = variants[variant];

  const resolvedAssetId = assetId || image?.asset?._id || image?.asset?._ref;

  const existingImageData = image?.asset?.gatsbyImageData;

  // Use existing GraphQL data unless regeneration is requested
  // or the data is not available.
  const shouldGenerate =
    Boolean(resolvedAssetId) && (regenerate || width != null || !existingImageData);

  const imageData = shouldGenerate
    ? imageDataFromAssetId(resolvedAssetId, config, width || config.width)
    : existingImageData;

  if (!imageData) return null;

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        ...(fill && {
          height: "100%",
          minHeight: 0,
        }),
        ...sx,
      }}
    >
      <GatsbyImage
        image={imageData}
        alt={image?.asset?.altText || ""}
        loading="lazy"
        style={{
          ...(fill && {
            width: "100%",
            height: "100%",
          }),
        }}
        imgStyle={{
          ...config.imgStyle,
          objectPosition: image?.hotspot
            ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
            : "50% 50%",
          ...imgStyle,
        }}
        {...props}
      />
    </Box>
  );
}
