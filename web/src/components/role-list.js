import React from "react";
import { ucfirst } from "../lib/string-utils";
import { Box, Grid, Text, Link, Heading, Paragraph } from "theme-ui";
import { darken, lighten, alpha, desaturate } from "@theme-ui/color";
import Icon from "./icon";

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

function ConditionalIcon(asset) {
  if (!asset) return null;
  return !asset.metadata.isOpaque;
}

export default function RoleList(props) {
  const { items, title, style } = props;

  var largeColumnCount = 3;

  if (items.length < 3) largeColumnCount = items.length;
  else if (items.length == 4) largeColumnCount = 2;

  var mediumColumnCount = 2;
  if (items.length < 3) mediumColumnCount = items.length;
  else if (items.length == 4) mediumColumnCount = 2;
  return (
    <Box sx={style}>
      <Heading
        as="h3"
        variant="contentSubHeading"
        sx={{
          color: "primary",
        }}
      >
        {title}
      </Heading>
      <Grid
        gap={[2, 3, 4]}
        columns={[1, mediumColumnCount, largeColumnCount]}
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
              variant="buttons.outlineBtn"
              sx={{
                textAlign: "center",
                alignContent: "center",
                "&:hover,&:focus": {
                  color: link ? "third" : desaturate("third", 1),
                },
                // fontFamily: "heading",
                // textDecoration: "none",
                // color: "body",
                // bg: alpha("darkest", 0.25),
                // "& > a": {
                //   color: "body",
                //   fontWeight: 400,
                // },
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
                      color: "currentColor",
                      "&:hover,&:focus": {
                        textDecoration: "none",
                        color: "currentColor",
                      },
                    }}
                  >
                    {children}
                  </Link>
                )}
              >
                <Box>
                  <Paragraph
                    sx={{
                      fontSize: 2,
                      fontFamily: "body",
                      fontWeight: "800",
                      letterSpacing: "2px",
                    }}
                  >
                    {(item.person && item.person.name) || <em>Missing name</em>}
                    {link && (
                      <span color="body">
                        <Icon sx={{ mx: 1 }} />
                      </span>
                    )}
                  </Paragraph>
                  {item.roles && (
                    <Paragraph
                      sx={{
                        fontFamily: "heading",
                        fontWeight: "400",
                        fontSize: 1,
                        // color: lighten("primary", 0.1),
                      }}
                    >
                      {item.roles.join(" + ")}
                    </Paragraph>
                  )}
                </Box>
              </ConditionalWrapper>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
}
