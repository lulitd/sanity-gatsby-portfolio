import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { ucfirst } from "../lib/string-utils";
import { Styled, Image, Grid, jsx, Box } from "theme-ui";
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
      <Styled.h3 sx={{
        color: lighten('secondary', .1),
        fontWeight: 100,
      }} >{title}</Styled.h3>
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
            <Styled.li
              key={item._key}
              sx={{
                textDecoration: "none",
                color: "body",
                pb:2,
                "& > a": {
                  color: "body",
                },
                "& span": {
                  color: "primary",
                  textTransform: "capitalize",
                  fontWeight: 100,
                },
              }}
            >
              <ConditionalWrapper
                condition={link}
                wrapper={(children) => (
                  <Styled.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      "&:hover": {
                        textDecoration: "underline",
                        color: "secondary",
                        "& span": {
                          color: "secondary",
                          textDecoration: "underline",
                        },
                      },
                    }}
                  >
                    {children}
                  </Styled.a>
                )}
              >
                <Box sx={{
                  "& p:last-child": {
                    pb: 1,
                  },
                }}>
                  <Styled.p sx={{
                    fontWeight: "bold",
                    fontSize: [2],
                    margin: 0,
                    lineHeight: 0,
                  }}> {(item.person && item.person.name) || <em>Missing name</em>}
                    {link && (<span color="body"><Icon sx={{mx:1}}/></span>)}
                  </Styled.p >
                  {item.roles && (<Styled.p sx={{
                    textTransform: "Capitalize",
                    color: lighten('primary', .1),
                  }}>{item.roles.join(" + ")}</Styled.p >)}
                </Box>
              </ConditionalWrapper>
            </Styled.li>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default RoleList;
