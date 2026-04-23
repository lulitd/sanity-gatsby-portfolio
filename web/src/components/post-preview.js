import React from "react";
import { buildImageObj } from "../lib/helpers";
import { format, isThisYear, isAfter, isSameDay } from "date-fns";
import { imageUrlFor } from "../lib/image-url";
import { Grid, Card, Image, Heading, Flex, Text } from "theme-ui";
import { lighten, alpha } from "@theme-ui/color";

import ThemedLink from "./ThemedLink";

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

function PostPreview(props) {
  const hasBG = props.mainImage && props.mainImage.asset;
  let bgURL;

  if (hasBG) {
    bgURL = imageUrlFor(buildImageObj(props.mainImage)).width(250).height(250).fit("fill").url();
  }

  return (
    <ThemedLink
      to={`/post/${props.slug.current}`}
      sx={{
        textDecoration: "none",
      }}
    >
      <Card
        my={2}
        sx={{
          borderRadius: 0,
          borderTopRightRadius: "default",
          borderBottomLeftRadius: "default",
          borderWidth: 2,
          borderStyle: "solid",
          color: "primary",
          fontFamily: "heading",
          letterSpacing: "0.25rem",
          borderColor: "inherit",
          minHeight: "[250px]",
          display: "flex",
          transition: "0.5s",
          height: "100%",
          overflow: "hidden",
          background: alpha("muted", 0.1),
          "&:hover, &:focus": {
            color: "background",
            borderColor: "secondary",
            borderRadius: "default",
            borderTopRightRadius: "0",
            borderBottomLeftRadius: "0",
            background: alpha("darkest", 1),
            "& h2,h3": {
              color: "secondary",
            },
            "& p": {
              color: lighten("secondary", 0.4),
            },
            "& p:last-of-type ": {
              color: lighten("secondary", 0.1),
              opacity: 0.8,
            },
          },
        }}
      >
        <Grid
          gap={0}
          columns={"1fr 2fr"}
          sx={{
            flex: 1,
          }}
        >
          <Image
            src={bgURL}
            alt={props.mainImage.alt}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />

          <Flex
            p={3}
            sx={{
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Flex flexDirection="column">
              <Heading
                sx={{
                  color: lighten("primary", 0.1),
                  textTransform: "uppercase",
                  pb: 1,
                }}
                fontSize={[4, 6]}
              >
                {props.title}
              </Heading>
              {props.publishedAt && (
                <Text
                  sx={{
                    color: "muted",
                    letterSpacing: "normal",
                    fontSize: "1",
                    p: 0,
                    m: 0,
                  }}
                >
                  {getLatestUpdate(props.publishedAt, props._updatedAt)}
                </Text>
              )}
            </Flex>
            {props.subtitle && (
              <Text
                sx={{
                  color: "muted",
                  letterSpacing: "normal",
                  flex: "1 1 auto",
                }}
              >
                {props.subtitle}
              </Text>
            )}
            <Text sx={{ color: "muted", fontSize: 1 }}>Read More...</Text>
          </Flex>
        </Grid>
      </Card>
    </ThemedLink>
  );
}

export default PostPreview;
