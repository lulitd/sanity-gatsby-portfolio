import React, { useRef } from "react";
import { Box, Grid, Image } from "theme-ui";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SanityImage from "./atoms/image";

const MotionBox = motion(Box);

const ParallaxHero = ({ mainImage, children }) => {
  const heroRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 125]);
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1.2, 1.0]);

  const y = useSpring(yRaw, { stiffness: 50, damping: 30 });
  const scale = useSpring(scaleRaw, { stiffness: 50, damping: 30 });

  return (
    <Box
      ref={heroRef}
      sx={{
        position: "relative",
        height: "75vh",
        overflow: "hidden",
      }}
    >
      <MotionBox
        style={{
          y,
          scale,
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "130%", // prevents edge gaps
          transform: "translateZ(0)", // GPU
        }}
      >
        <SanityImage
          image={mainImage}
          variant="hero"
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      </MotionBox>

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
