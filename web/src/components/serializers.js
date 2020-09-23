/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Figure from './figure'
import React from 'react'
import EmbedVideo from './embed-video'
const serializers = {
  types: {
    figure: Figure,
    video: ({ node }) => {
      const { url } = node
      return (<EmbedVideo url={url} />)
    },
    block(props) {
      switch (props.node.style) {
        case "h1":
          return <Styled.h1>{props.children}</Styled.h1>
        case "h2":
          return <Styled.h2>{props.children}</Styled.h2>
        case "h3":
          return <Styled.h3>{props.children}</Styled.h3>
        case "h4":
          return <Styled.h4>{props.children}</Styled.h4>
        case "h5":
          return <Styled.h5>{props.children}</Styled.h5>
        case "h6":
          return <Styled.h6>{props.children}</Styled.h6>
        case "blockquote":
          return <Styled.blockquote>{props.children}</Styled.blockquote>
        case "ul":
          return <Styled.ul>{props.children}</Styled.ul>
        case "li":
          return <Styled.li>{props.children}</Styled.li>
        default:
          return <Styled.p>{props.children}</Styled.p>
      }
    },
  },
  marks: {
    link: ({ children, mark }) => (
      <Styled.a href={mark.href} target='_blank' rel="noopener noreferrer">{children}</Styled.a>
    ),
  },
}

export default serializers
