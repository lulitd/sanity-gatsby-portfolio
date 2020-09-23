import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { ucfirst } from "../lib/string-utils";
import { Box } from "rebass"
import { Styled, Image,Grid, jsx } from "theme-ui"
import { FaHandMiddleFinger } from "react-icons/fa";
//@jsx jsx
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;


function ConditionalIcon(asset) {
  if (!asset) return null;
  return !asset.metadata.isOpaque;
};
function RoleList({ items, title }) {
  return (
    <div >
      <Styled.h2>{title}</Styled.h2>
      <Grid as="ul"
      columns={[2,3]}
      sx={{
        listStylePosition:"inside",
        listStyle:'none',
      }}
      >
        {items.map(item => {
          let link =
            item.person.website ||
            item.person.linkedin ||
            item.person.github ||
            item.person.twitter ||
            item.person.instagram;

          if (item.person.name === "Lalaine Ulit-Destajo") link = "";

          const profile = item.person && item.person.image && item.person.image.asset;
          const isIcon = ConditionalIcon(profile);
          let width = isIcon ? "80%" : "120%";
          return (
            <Styled.li key={item._key} >
              <ConditionalWrapper
                condition={link}
                wrapper={children => <Styled.a href={link} target='_blank' rel="noopener noreferrer">{children}</Styled.a>}
              >
                <Box width="100px" height="100px"
                  sx={{
                    borderColor: "muted",
                    borderStyle: "solid",
                    borderRadius: 9999,
                    overflow: "hidden",
                    borderWidth: 2,
                    position: "relative",
                    mx:"auto",
                  }}
                >
                  <Image
                    src={item.person.image ? imageUrlFor(buildImageObj(item.person.image))
                      .width(100)
                      .height(100)
                      .fit("crop")
                      .url() : ""}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: width,
                      height: width,
                      maxWidth: width,
                    }}
                    alt=""
                  />
                </Box>
                <Box textAlign="center">
                  <div>
                    <strong>{(item.person && item.person.name) || <em>Missing name</em>}</strong>
                  </div>
                  {item.roles && (
                    <div >
                      {item.roles.map((role, idx) => {
                        switch (true) {
                          case idx === 0:
                            return <span key={role}>{ucfirst(role)}</span>;
                          case idx === item.roles.length - 1:
                            return <span key={role}> & {role}</span>;
                          default:
                            return <span key={role}>, {role}</span>;
                        }
                      })}
                    </div>
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
