import React from "react";
import Image from "gatsby-plugin-sanity-image";
//import { getFluidGatsbyImage } from "gatsby-source-sanity";
import clientConfig from "../../client-config";
import { Card, Text } from "theme-ui";
import { alpha } from "@theme-ui/color";
import { reduce } from "ramda";
export default ({node}) => {
  // if (!node.image) {
  //   console.log(node);
  //   return null;
  // }

  // console.log(node);
  // const fluidProps = getFluidGatsbyImage(node.asset._ref, { maxWidth: 675 }, clientConfig.sanity);

  return (
    <Card sx={{
      marginBottom: "1rem",
			position: "relative"
    }} as="figure">
   
      <Image {...node} sx={{
        width:["100%"]
      }}/>
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
    </Card>
  );
};
