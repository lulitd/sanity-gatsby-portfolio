import React from "react";
import { ucfirst } from "../lib/string-utils";
import { Box, Text, Link, Heading } from "theme-ui";
import { darken, lighten } from "@theme-ui/color";
import Icon from "./icon";

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

function ConditionalIcon(asset) {
  if (!asset) return null;
  return !asset.metadata.isOpaque;
}

function RoleList({ items, title, style }) {
  return (
    <Box
      sx={{
        ...style,
      }}
    >
      <Heading as="h3" variant="contentSubHeading">
        {title}
      </Heading>
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
            <Box
              as="li"
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
                  <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      "&:hover,&:focus": {
                        textDecoration: "none",
                        "& p": {
                          color: "secondary",
                        },
                        "& span": {
                          color: "secondary",
                        },
                      },
                    }}
                  >
                    {children}
                  </Link>
                )}
              >
                <Box mb={3}>
                  <Text as="p" sx={{ fontWeight: 900, letterSpacing: "2px" }}>
                    {(item.person && item.person.name) || <em>Missing name</em>}
                    {link && (
                      <span color="body">
                        <Icon sx={{ mx: 1 }} />
                      </span>
                    )}
                  </Text>
                  {item.roles && (
                    <Text
                      as="p"
                      sx={{
                        textTransform: "Capitalize",
                        color: lighten("primary", 0.1),
                      }}
                    >
                      {item.roles.join(" + ")}
                    </Text>
                  )}
                </Box>
              </ConditionalWrapper>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default RoleList;
