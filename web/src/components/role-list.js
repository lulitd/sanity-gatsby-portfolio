import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { ucfirst } from "../lib/string-utils";
import { Styled, Image, Grid, jsx,Box } from "theme-ui";
import { FaHandMiddleFinger } from "react-icons/fa";
import { darken, lighten } from '@theme-ui/color'
//@jsx jsx
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

function ConditionalIcon(asset) {
  if (!asset) return null;
  return !asset.metadata.isOpaque;
}
function RoleList({ items, title }) {
  return (
    <Box pb={2} sx={{ textAlign: 'center' }}>
      <Styled.h3 sx={{
           color: lighten('secondary', .1),
           fontWeight: 100,
      }} >{title}</Styled.h3>
      <Grid
        as="ul"
        columns={[1, items.length % 2 == 0 ? 2 : 3, null]}
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
                "& > a": {
                  color: "body",
                },
                "& span": {
                  color: "primary",
                  textTransform: "capitalize",
                  fontWeight:100,
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
                          color: "body",
                          textDecoration: "underline",
                        },
                      },
                    }}
                  >
                    {children}
                  </Styled.a>
                )}
              >
                <Box>
                  <strong>{(item.person && item.person.name) || <em>Missing name</em>} </strong>
                  {item.roles && (
                    <Box>
                      <span>
                        {item.roles.map((role, idx) => {
                          switch (true) {
                            case idx === 0:
                              return <span key={`${role}-${item.person.name}`}>{role}</span>;
                            case idx === item.roles.length - 1:
                              return <span key={`${role}-${item.person.name}`}> & {role}</span>;
                            default:
                              return <span key={`${role}-${item.person.name}`}>, {role}</span>;
                          }
                        })}
                      </span>
                    </Box>
                  )}
                </Box>
              </ConditionalWrapper>
            </Styled.li>
          );
        })}
      </Grid>
    </Box>
  );
}

export default RoleList;
