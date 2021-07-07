import React from "react";
import Img from "gatsby-image";
import { getFluidGatsbyImage } from "gatsby-source-sanity";
import clientConfig from "../../client-config";
import { Box, Text } from "rebass";
import { alpha } from "@theme-ui/color";
import { reduce } from "ramda";
export default ({ node }) => {
  if (!node.asset) {
    return null;
  }

  const fluidProps = getFluidGatsbyImage(node.asset._ref, { maxWidth: 675 }, clientConfig.sanity);

  return (
    <Box sx={{
      marginBottom: "1rem",
			position: "relative"

    }} as="figure">
      <Img fluid={fluidProps} alt={node.alt} />
      {node.caption && < Text as={"figcaption"}
      sx={{
        position:"absolute",
        bottom:0, 
        width:"100%",
        padding: 2,
				lineHeight: 2,
				textAlign: "center",
				color: "muted",
        bg: alpha("background", 0.75),
        fontStyle:"italic",
        fontSize:"smaller"
      }}
      >
        
        {node.caption}</Text>}
    </Box>
  );
};
