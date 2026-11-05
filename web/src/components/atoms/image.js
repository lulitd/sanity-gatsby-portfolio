import React from "react";
import { Box } from "theme-ui";
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";
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

export default function SanityImage({
  image,
  assetId,
  variant = "thumb",
  imgStyle,
  sx,
  fill = false,
  ...props
}) {
  if (!image?.asset && !assetId) return null;

  const imageData = image ? image.asset.gatsbyImageData : imageDataFromAssetId(assetId);

  if (!imageData) return null;

  const config = variants[variant];

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
        style={{
          ...(fill && {
            width: "100%",
            height: "100%",
          }),
        }}
        imgStyle={{
          objectFit: config.imgStyle.objectFit,
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
