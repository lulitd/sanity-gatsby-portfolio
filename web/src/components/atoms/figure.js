import React from "react";
//import Image from "gatsby-plugin-sanity-image";
import { Box, Text } from "theme-ui";
import { alpha } from "@theme-ui/color";
import SanityImage from "./image";

export default ({ value }) => {
  console.log(value);
  return (
    <Box
      sx={{
        marginBottom: "1rem",
        position: "relative",
      }}
      as="figure"
    >
      <SanityImage assetId={value.asset.id} sx={{ width: "100%" }} />
      {value?.caption && (
        <Text
          as={"figcaption"}
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: 2,
            lineHeight: 2,
            textAlign: "center",
            color: "primary300",
            bg: alpha("background", 0.75),
            fontStyle: "italic",
            fontSize: "smaller",
          }}
        >
          {value.caption}
        </Text>
      )}
    </Box>
  );
};
