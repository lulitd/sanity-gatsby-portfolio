import React from "react";
import { PortableText } from "@portabletext/react";
import { Themed } from "@theme-ui/mdx";
import { Box, Message } from "theme-ui";

import Figure from "../atoms/figure";
import EmbedVideo from "../atoms/embed-video";
import CodeRenderer from "../atoms/codeRenderer";
import SanityMediaCarousel from "../atoms/sanityMediaCarousel";
import MotionClip from "../atoms/motionClip";

const components = {
  types: {
    figure: ({ value }) => <Figure value={value} />,

    video: ({ value }) => (
      <Box className="project-media">
        <EmbedVideo url={value.url} />
      </Box>
    ),

    code: ({ value }) => (
      <Box className="project-code">
        <CodeRenderer value={value} />
      </Box>
    ),
    mediaCarousel: ({ value }) => (
      <SanityMediaCarousel value={value} height={["300px", "450px", "560px"]} />
    ),
    motionClip: ({ value }) => (
      <MotionClip
        src={value.clip?.asset?.url}
        poster={value.poster?.asset?.url}
        playbackMode={value.playbackMode || "autoplay"}
        loop={value.loop ?? false}
        resetOnLeave={value.resetOnLeave ?? true}
        caption={value.caption}
        description={value.description}
        aspectRatio={value.aspectRatio || "auto"}
      />
    ),
  },

  marks: {
    link: ({ children, value }) => {
      const href = value?.href;
      if (!href) return children;

      const external = /^https?:\/\//i.test(href);

      return (
        <Themed.a
          href={href}
          {...(external
            ? {
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {})}
        >
          {children}
        </Themed.a>
      );
    },
  },

  block: {
    h1: ({ children }) => <Themed.h1>{children}</Themed.h1>,
    h2: ({ children }) => <Themed.h2>{children}</Themed.h2>,
    h3: ({ children }) => <Themed.h3>{children}</Themed.h3>,
    h4: ({ children }) => <Themed.h4>{children}</Themed.h4>,
    h5: ({ children }) => <Themed.h5>{children}</Themed.h5>,
    h6: ({ children }) => <Themed.h6>{children}</Themed.h6>,

    blockquote: ({ children }) => (
      <Message variant="quote" as="blockquote">
        {children}
      </Message>
    ),

    normal: ({ children }) => <Themed.p>{children}</Themed.p>,
  },

  list: {
    bullet: ({ children }) => <Themed.ul>{children}</Themed.ul>,
    number: ({ children }) => <Themed.ol>{children}</Themed.ol>,
  },

  listItem: {
    bullet: ({ children }) => <Themed.li>{children}</Themed.li>,
    number: ({ children }) => <Themed.li>{children}</Themed.li>,
  },
};

export default function PortableTextRenderer({ value = [], style = {} }) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <Box
      className="portableText"
      sx={{
        minWidth: 0,
        maxWidth: "100%",
        textWrapStyle: "pretty",
        lineHeight: 1.5,

        // Paragraphs
        "& p": {
          lineHeight: 1.5,
          mb: 5,
          maxWidth: "75ch",
        },

        "& strong": {
          fontWeight: 800,
        },

        // Avoid unnecessary trailing space
        "& > :last-child": {
          mb: 0,
        },

        // Main content headings
        "& h2, & h3": {
          color: "primary500",
          fontFamily: "heading",
          mt: 6,
          mb: 3,
        },

        "& h2": {
          fontSize: [3, 4, 4],
        },

        "& h3": {
          fontSize: [2, 3, 3],
        },

        // Smaller headings
        "& h4, & h5, & h6": {
          color: "primary500",
          fontFamily: "heading",
          mt: 7,
          mb: 2,
        },

        // First heading shouldn't add top spacing
        "& > :is(h1, h2, h3, h4, h5, h6):first-child": {
          mt: 0,
        },

        // Lists
        "& ul, & ol": {
          pl: 6,
          my: 4,
          lineHeight: 1.2,
        },

        "& li": {
          mb: 2,
        },

        "& li:last-child": {
          mb: 0,
        },

        // Prevent oversized media
        "& img": {
          maxWidth: "100%",
          height: "auto",
        },

        "& > figure:not(.project-carousel):not(.motion-clip)": {
          maxWidth: "65%",
          my: 6,
          mx: "3",
          justifySelf: ["normal", "center", "center"],
        },
        "& > .motion-clip": {
          width: "100%",
          maxWidth: "500px",
          my: 6,
          mx: "auto",
        },
        "& .project-carousel": {
          width: "100%",
          maxWidth: "100%",
          my: 6,
          mx: 0,

          "& img": { objectFit: "contain", height: "100%" },
        },

        // Embedded videos
        "& .project-media": {
          my: 6,
          mx: "3",
          width: "65%",
          justifySelf: ["normal", "center", "center"],
          minWidth: 0,
        },

        "& .project-media iframe": {
          maxWidth: "100%",
        },

        // Code blocks
        "& .project-code": {
          my: 4,
          maxWidth: "100%",
          overflowX: "auto",
        },

        ...style,
      }}
    >
      <PortableText value={value} components={components} />
    </Box>
  );
}
