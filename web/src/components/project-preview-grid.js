import React from "react";
import ProjectPreview from "./project-preview";
import { Grid, Box, Heading, Flex } from "theme-ui";
import ThemedLink from "./atoms/ThemedLink";
import { alpha } from "@theme-ui/color";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const { isFuture, parseISO } = require("date-fns");

function ProjectPreviewGrid({ nodes = [], title = "", order, columns = [1, 1, 2], ...props }) {
  const reduceMotion = useReducedMotion();

  let filtered = nodes.filter((node) => !isFuture(parseISO(node.publishedAt)));

  if (order) {
    const idOrder = order.map((o) => o._id);

    // Sort a copy rather than mutating props
    filtered = [...filtered].sort((a, b) => {
      const aIndex = idOrder.indexOf(a._id);
      const bIndex = idOrder.indexOf(b._id);

      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;

      return aIndex - bIndex;
    });
  }

  return (
    <Box
      sx={{
        textAlign: "left",
        backgroundImage: (t) => `
          linear-gradient(
            to bottom,
            ${alpha("darkest", 0.3)(t)},
            ${alpha("darkest", 0.2)(t)},
            ${alpha("darkest", 0.2)(t)},
            ${alpha("darkest", 0.3)(t)}
          )
        `,
        py: 4,
        borderRadius: "3rem",
        borderTop: "2px dotted",
        borderBottom: "2px dotted",
        borderColor: "primary",
        px: [2, 2, 4],
      }}
    >
      {title && (
        <Heading
          as="h2"
          sx={{
            color: "primary",
            opacity: 0.6,
            fontFamily: "nav",
            pb: 1,
            fontSize: [4, 4, 4],
            fontWeight: "100",
            lineHeight: "initial",
            textTransform: "uppercase",
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          {title}
        </Heading>
      )}

      <Grid
        columns={1}
        sx={{
          color: "inherit",
          my: [5, 3, 3],
          px: 0,
          pb: 2,
          rowGap: [2, 3, 2],
          "> div:not(:last-child)": {
            borderBottom: "1px solid",
            borderColor: alpha("primary", 0.4),
          },
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.map((node) => (
            <motion.div
              key={node._id}
              layout={reduceMotion ? false : "position"}
              onLayoutAnimationComplete={() => {
                ScrollTrigger.refresh();
              }}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: reduceMotion ? 0 : 0.35,
                  ease: "easeOut",
                },
              }}
              exit={{
                opacity: 0,
                y: reduceMotion ? 0 : -12,
                scale: reduceMotion ? 1 : 0.98,
                transition: {
                  duration: reduceMotion ? 0 : 0.2,
                  ease: "easeIn",
                },
              }}
              transition={{
                layout: {
                  duration: reduceMotion ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <ProjectPreview {...node} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Grid>

      {props.browseMoreHref && (
        <Flex sx={{ justifyContent: "space-around" }}>
          <ThemedLink variant="outlineBtn" to={props.browseMoreHref}>
            Browse More
          </ThemedLink>
        </Flex>
      )}
    </Box>
  );
}

export default ProjectPreviewGrid;
