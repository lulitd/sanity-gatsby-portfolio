import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { ucfirst } from "../lib/string-utils";
import { Image, Grid, Box, Flex, Text } from "theme-ui";
import { Themed } from '@theme-ui/mdx';
import { darken, lighten } from '@theme-ui/color'
import Icon from "./icon";

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

function ConditionalIcon(asset) {
  if (!asset) return null;
  return !asset.metadata.isOpaque;
}

function RoleList({ items, title , style }) {
  return (
    <Box 
      sx={{
        ...style
      }}>
      <Themed.h3 sx={{
        color: lighten('secondary', .1),
        fontWeight: 100,
      }} >{title}</Themed.h3>
      <Box
        as="ul"
        sx={{
          listStylePosition: "inside",
          listStyle: "none",
          padding: 0,
        }}
      >
        {items.map((item) => {
          let link =
            item.person.website ||
            item.person.linkedin ||
            item.person.github ||
            item.person.twitter ||
            item.person.instagram;
          if (item.person.name === "Lalaine Ulit-Destajo") link = "";

          return (
            <Themed.li
              key={item._key}
              sx={{
                fontFamily: "heading",
                textDecoration: "none",
                color: "body",
                "& > a": {
                  color: "body",
                  fontWeight: 400,
                },
              }}
            >
              <ConditionalWrapper
                condition={link}
                wrapper={(children) => (
                  <Themed.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      "&:hover,&:focus": {
                        textDecoration: "none",
                        "& p": {
                          color: "secondary"
                        },
                        "& span": {
                          color: "secondary"
                        },
                      },
                    }}
                  >
                    {children}
                  </Themed.a>
                )}
              >
                <Box mb={3}>
                  <Text as="p">
                    {(item.person && item.person.name) || <em>Missing name</em>}
                    {link && (<span color="body"><Icon sx={{ mx: 1 }} /></span>)}
                  </Text >
                  {item.roles && (<Text as="p" sx={{
                    textTransform: "Capitalize",
                    color: lighten('primary', .1),
                  }}>{item.roles.join(" + ")}</Text >)}
                </Box>
              </ConditionalWrapper>
            </Themed.li>
          );
        })}
      </Box>
    </Box>
  );
}

export default RoleList;
