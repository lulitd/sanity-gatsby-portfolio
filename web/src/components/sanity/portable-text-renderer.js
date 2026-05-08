import React from "react";
import { PortableText } from "@portabletext/react";
import { Themed } from "@theme-ui/mdx";

import { Message } from "theme-ui";
import Figure from "../atoms/figure";
import EmbedVideo from "../atoms/embed-video";
import { Box } from "theme-ui";
import CodeRenderer from "../atoms/codeRenderer";

const components = {
  types: {
    figure: ({ value }) => {
      return <Figure value={value} />;
    },
    video: ({ value }) => {
      const { url } = value;
      return <EmbedVideo url={url} />;
    },
    code: ({ value }) => {
      return <CodeRenderer />;
    },
  },
  marks: {
    link: ({ children, value }) => (
      <Themed.a href={value?.href} target="_blank" rel="noopener noreferrer ">
        {children}
      </Themed.a>
    ),
  },
  block: {
    h1: ({ children }) => <Themed.h1>{children}</Themed.h1>,
    h2: ({ children }) => <Themed.h2>{children}</Themed.h2>,
    h3: ({ children }) => <Themed.h3>{children}</Themed.h3>,
    h4: ({ children }) => <Themed.h4>{children}</Themed.h4>,
    h5: ({ children }) => <Themed.h5>{children}</Themed.h5>,
    h6: ({ children }) => <Themed.h6>{children}</Themed.h6>,
    blockquote: ({ children }) => (
      <Message variant="quote" as={"blockquote"}>
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
  },
};

export default function PortableTextRenderer({ value, style }) {
  return (
    <Box sx={style}>
      <PortableText value={value} components={components} />
    </Box>
  );
}
