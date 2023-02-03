import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { ucfirst } from "../lib/string-utils";
import { Image, Grid, jsx, Box } from "theme-ui";
import { Themed } from '@theme-ui/mdx';
import { FaHandMiddleFinger } from "react-icons/fa";
import { darken, lighten } from '@theme-ui/color'
import { Flex } from "rebass";
import Icon from "./icon";
//@jsx jsx
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

function ConditionalIcon(asset) {
  if (!asset) return null;
  return !asset.metadata.isOpaque;
}

function RoleList({ items, title }) {
  return (
    <Flex pb={2}
      flexDirection="column" alignItems="center" width="fitContent">
      <Themed.h3 sx={{
        color: lighten('secondary', .1),
        fontWeight: 100,
      }} >{title}</Themed.h3>
      <Flex
        as="ul"
        flexDirection="column"
        textAlign="center"
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
                textDecoration: "none",
                color: "body",
                pb:2,
                "& > a": {
                  color: "body",
                },
                "& span": {
                  color: "muted",
                  textTransform: "capitalize",
                  fontWeight: 100,
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
                      "&:hover": {
                        textDecoration: "none",
                        transform:"scale(5)",
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
                <Box sx={{
                  "& p:last-child": {
                    pb: 1,
                  },
                }}>
                  <Themed.p sx={{
                    fontWeight: "bold",
                    fontSize: [2],
                    margin: 0,
                    lineHeight: 0,
                  }}> {(item.person && item.person.name) || <em>Missing name</em>}
                    {link && (<span color="body"><Icon sx={{mx:1}}/></span>)}
                  </Themed.p >
                  {item.roles && (<Themed.p sx={{
                    textTransform: "Capitalize",
                    color: lighten('primary', .1),
                  }}>{item.roles.join(" + ")}</Themed.p >)}
                </Box>
              </ConditionalWrapper>
            </Themed.li>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default RoleList;
