import React, { useRef } from "react";
import { Box, Grid } from "theme-ui";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

import SanityImage from "../atoms/image";

const MotionBox = motion(Box);

const SplitHero = ({ mainImage, children, imagePosition = "right" }) => {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const y = useSpring(yRaw, {
    stiffness: 50,
    damping: 30,
  });

  const imageOnLeft = imagePosition === "left";

  return (
    <Grid
      ref={heroRef}
      as="header"
      gap={0}
      columns={[1, 1, imageOnLeft ? "4fr 5fr" : "5fr 4fr"]}
      sx={{
        minHeight: ["auto", "auto", "75vh"],
        maxHeight: ["none", "none", "900px"],
        bg: "background",
        borderBottom: "1px solid",
        borderColor: "primary",
      }}
    >
      {/* Text panel */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minWidth: 0,
          px: [3, 4, 5],
          py: [6, 6, 7],
          order: [0, 0, imageOnLeft ? 1 : 0],
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "650px",
            mx: "auto",
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Image panel */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          isolation: "isolate",
          minWidth: 0,
          minHeight: ["320px", "450px", "100%"],
          order: [1, 1, imageOnLeft ? 0 : 1],
          bg: "background",
        }}
      >
        <MotionBox
          sx={{
            position: "absolute",
            inset: "-12% 0",
            width: "100%",
            height: "124%",
          }}
          style={{
            y: reduceMotion ? 0 : y,
          }}
        >
          <SanityImage image={mainImage} variant="hero" fill />
        </MotionBox>
      </Box>
    </Grid>
  );
};

export default SplitHero;
