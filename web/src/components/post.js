import { format, isThisYear, isAfter, isSameDay,parseISO} from "date-fns";
import React from "react";
import { Link } from "gatsby";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import Container from "./container";
import { Heading, Box, Text, Button } from "rebass";
import { AspectImage, Grid, jsx } from "theme-ui";
import { Themed } from '@theme-ui/mdx';
import ThemedLink from "./ThemedLink";
// @jsx jsx

function getLatestUpdate(publishedAt, _updatedAt) {
  // use the latest date
  const useUpdateDate = isAfter(_updatedAt, publishedAt);
  const date = useUpdateDate ? _updatedAt : publishedAt;
  const prefix = isSameDay(_updatedAt, publishedAt)
    ? "Published on"
    : useUpdateDate
    ? "Updated on"
    : "Published on";
  const formatter = isThisYear(date) ? "MMMM Do" : "MMMM Do, YYYY";
  return `${prefix} ${format(date, formatter)}`;
}
function Post(props) {
  const { title, _rawContent, mainImage, categories, publishedAt, _updatedAt } = props;

  return (
    <Container as="article">
      <Box pb={[1]}>
        {props.mainImage && mainImage.asset && (
          <Box pb={2}>
            <AspectImage
              ratio={16 / 4}
              src={imageUrlFor(buildImageObj(mainImage))
                .width(1200)
                .height(Math.floor((4 / 16) * 1200))
                .fit("crop")
                .url()}
              alt={mainImage.alt}
            />
          </Box>
        )}
        <Themed.h1 sx={{ p: 0, m: 0, textTransform: "capitalize " }}>{title}</Themed.h1>
        <Themed.p sx={{ p: 0, m: 0, color: "muted", fontWeight: "body" }}>
          {getLatestUpdate(publishedAt, _updatedAt)}
        </Themed.p>
      </Box>
      <Box>
        {_rawContent && (
          <Box pb={2}>
            <BlockContent blocks={_rawContent || []} />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Post;
