import React, { useRef } from "react";
import { Box, Grid, Image } from "theme-ui";
import { motion, useScroll, useTransform } from "framer-motion";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

const MotionImage = motion(Image);

const ParallaxHero = ({ mainImage, children }) => {
  const heroRef = React.useRef(null);

  // sanity Image
  const bgUrl = mainImage?.asset && imageUrlFor(buildImageObj(mainImage)).width(2000).url();
  const hotspot = mainImage?.hotspot || { x: 0.5, y: 0.5 };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <Box
      ref={heroRef}
      sx={{
        position: "relative",
        height: "75vh",
        overflow: "hidden",
      }}
    >
      <MotionImage
        src={bgUrl}
        alt=""
        style={{ y, scale }}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "120%",
          objectFit: "cover",
          objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%`,
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
      <Box sx={{ position: "absolute", inset: 0, bg: "rgba(0,0,0,0.25)" }} />

      <Grid
        sx={{
          position: "relative",
          height: "100%",
          gridTemplateColumns: ["1fr 6fr 1fr", "1fr 4fr 1fr", "1fr 2fr 1fr"],
          gridTemplateRows: ["1fr 2fr 1fr"],
        }}
      >
        {children}
      </Grid>
    </Box>
  );
};

export default ParallaxHero;
