/** @jsx jsx */
import { jsx } from "theme-ui";
import { Themed } from '@theme-ui/mdx';
import Figure from "./figure";
import React from "react";
import EmbedVideo from "./embed-video";
const serializers = {
  types: {
    figure: Figure,
    video: ({ node }) => {
      const { url } = node;
      return <EmbedVideo url={url} />;
    },
    block(props) {
      switch (props.node.style) {
        case "h1":
          return <Themed.h1>{props.children}</Themed.h1>;
        case "h2":
          return <Themed.h2>{props.children}</Themed.h2>;
        case "h3":
          return <Themed.h3>{props.children}</Themed.h3>;
        case "h4":
          return <Themed.h4>{props.children}</Themed.h4>;
        case "h5":
          return <Themed.h5>{props.children}</Themed.h5>;
        case "h6":
          return <Themed.h6>{props.children}</Themed.h6>;
        case "blockquote":
          return <Themed.blockquote>{props.children}</Themed.blockquote>;
        case "ul":
          return <Themed.ul>{props.children}</Themed.ul>;
        case "li":
          return <Themed.li>{props.children}</Themed.li>;
        default:
          return <Themed.p>{props.children}</Themed.p>;
      }
    },
  },
  marks: {
    link: ({ children, mark }) => (
      <Themed.a href={mark.href} target="_blank" rel="noopener noreferrer">
        {children}
      </Themed.a>
    ),
  },
};

export default serializers;
