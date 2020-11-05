import { format, distanceInWords, differenceInDays } from "date-fns";
import React from "react";
import { Link } from "gatsby";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import Container from "./container";
import RoleList from "./role-list";
import ProjectPreviewGrid from "./project-preview-grid";
import { Heading, Box, Text, Button } from "rebass";
import { AspectImage, Styled, Grid, jsx } from "theme-ui";
import ThemedLink from "./ThemedLink";
// @jsx jsx
function Project(props) {
  const {
    _rawProjectBrief,
    _rawProjectBreakdown,
    title,
    categories,
    members,
    accolades,
    mainImage,
    relatedProjects,
    awards,
  } = props;

  const collaborators = members;

  let merged = [...accolades, ...awards];

  const allIds = merged.map((el) => el["_id"]);
  const uniqueAccolades = merged.filter((obj, index) => {
    return allIds.indexOf(obj["_id"]) === index;
  }); // removing all duplicates

  uniqueAccolades.sort((a, b) => a.date - b.date).reverse();

  const filteredProjects = relatedProjects.filter((item) => {
    return item && item.publishedAt;
  });

  return (
    <Container as="article" px={[2, 4, 6]}>
      <Box pb={[2, 4]}>
        <Heading>{title}</Heading>
        {props.mainImage && mainImage.asset && (
          <AspectImage
            ratio={16 / 4}
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((4 / 16) * 1200))
              .fit("crop")
              .url()}
            alt={mainImage.alt}
          />
        )}
      </Box>
      <div>
        {uniqueAccolades && uniqueAccolades.length > 0 && (
          <Box>
            <Styled.h3>Exhibitions & Awards</Styled.h3>
            <Grid as="ul" gap={2} columns={[1, 2, 2]}>
              {uniqueAccolades.map((accolade) => {
                let label = "";
                label += `${accolade.date.split("-")[0]}: `;
                label += accolade.title;
                label += accolade.event ? `,\n${accolade.event}` : "";
                return (
                  <Box as="li" key={accolade._id}>
                    <Text
                      sx={{
                        whiteSpace: "pre-wrap",
                      }}
                      fontWeight="bolder"
                      fontSize={[2, 1, 2]}
                    >{`${label}`}</Text>
                    <Text color={"primary"} fontSize={[2, 1, 2]}>
                      {accolade.address}
                    </Text>
                  </Box>
                );
              })}
            </Grid>
          </Box>
        )}
        <Box>
          {_rawProjectBrief && (
            <Box pb={2}>
              <Styled.h3>Project Description</Styled.h3>{" "}
              <BlockContent blocks={_rawProjectBrief || []} />
            </Box>
          )}
          {_rawProjectBreakdown && (
            <Box pb={2}>
              <Styled.h3>Project Breakdown</Styled.h3>
              <BlockContent blocks={_rawProjectBreakdown || []} />
            </Box>
          )}
        </Box>
        <Box as="aside">
          {collaborators && collaborators.length > 0 && (
            <RoleList items={collaborators} title="Team" />
          )}
          {categories && categories.length > 0 && (
            <div>
              <Styled.h3>Categories</Styled.h3>
              <ul>
                {categories.reduce((acm, cat) => {
                  if (cat.projectFilter) {
                    const el = (
                      <Styled.li sx={{ display: "inline-block", pr: "2" }}>
                        <ThemedLink
                          block="true"
                          to={`/archive/${cat.slug.current}`}
                          variant="outlineBtn"
                          key={cat._id}
                        >
                          #{cat.title}
                        </ThemedLink>
                      </Styled.li>
                    );
                    acm.push(el);
                  }
                  return acm;
                }, [])}
              </ul>
            </div>
          )}
        </Box>
      </div>

      {filteredProjects && filteredProjects.length > 0 && (
        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "muted",
            mt: [5, 6],
          }}
        >
          <Styled.h3>Related Projects</Styled.h3>
          <ProjectPreviewGrid nodes={filteredProjects} />
        </Box>
      )}
    </Container>
  );
}

export default Project;
