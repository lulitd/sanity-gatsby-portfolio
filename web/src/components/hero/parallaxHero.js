import React, { useRef } from "react";
import { Box } from "theme-ui";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import SanityImage from "../atoms/image";

const ParallaxHero = ({ mainImage, children }) => {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Animate the image only, not the content.
  const yRaw = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  const smoothY = useSpring(yRaw, {
    stiffness: 50,
    damping: 30,
  });

  const smoothScale = useSpring(scaleRaw, {
    stiffness: 50,
    damping: 30,
  });

  return (
    <Box
      ref={heroRef}
      as="header"
      sx={{
        position: "relative",
        height: ["65svh", "75svh", "85vh"],
        minHeight: ["420px", "500px", "560px"],
        maxHeight: "950px",
        overflow: "hidden",
        isolation: "isolate",
        bg: "background",
      }}
    >
      {/* Animated background */}
      <motion.div
        sx={{
          position: "absolute",
          inset: "-10% 0",
          width: "100%",
          height: "120%",
        }}
        style={{
          y: reduceMotion ? 0 : smoothY,
          scale: reduceMotion ? 1 : smoothScale,
        }}
      >
        <SanityImage image={mainImage} variant="hero" fill />
      </motion.div>

      {/* Contrast gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            linear-gradient(
              to top,
              rgba(0,0,0,0.85) 0%,
              rgba(0,0,0,0.48) 38%,
              rgba(0,0,0,0.08) 75%,
              rgba(0,0,0,0.25) 100%
            )
          `,
        }}
      />

      {/* Hero content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: "100%",
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          px: [3, 4, 5],
          py: [4, 5, 6],
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ParallaxHero;
