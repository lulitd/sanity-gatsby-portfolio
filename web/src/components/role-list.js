import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { ucfirst } from "../lib/string-utils";
import { Box } from "rebass";
import { Styled, Image, Grid, jsx } from "theme-ui";
import { FaHandMiddleFinger } from "react-icons/fa";
//@jsx jsx
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

function ConditionalIcon(asset) {
  if (!asset) return null;
  return !asset.metadata.isOpaque;
}
function RoleList({ items, title }) {
  return (
    <div>
      <Styled.h2>{title}</Styled.h2>
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
                      color: "blue",
                      "&:hover": {
                        textDecoration: "underline",
                        color: "secondary",
                        "& span": {
                          color: "body",
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
    </div>
  );
}

export default RoleList;
