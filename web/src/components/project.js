import { format, distanceInWords, differenceInDays } from "date-fns";
import React from "react";
import { Link } from "gatsby";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import Container from "./container";
import RoleList from "./role-list";
import ProjectPreviewGrid from "./project-preview-grid";
import { Heading, Box, Text, Button, Flex } from "rebass";
import { AspectImage, Styled, Grid, jsx } from "theme-ui";
import ThemedLink from "./ThemedLink";
import { darken, lighten } from '@theme-ui/color'
import { FaAutoprefixer } from "react-icons/fa";
import TransitionState from "gatsby-plugin-transition-link"

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

  const categoriesButtons =
    <Box pb={2} sx={{ textAlign: 'center' }}>
      <ul sx={{
        listStyle: "none",
        padding: 0,
      }}>
        {categories.reduce((acm, cat) => {
          if (cat.projectFilter) {
            const el = (
              <Styled.li sx={{ display: "inline-block",pr:[2], py:[3] }} key={`li_${cat._id}`}>
                <ThemedLink
                  block
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
    </Box>; 

  return (
    <Container as="article" px={[2, 4, 6]} mb={4}>

      {/* Title and Image */}
      <Box pb={[0]} sx={{ textAlign: 'center' }}>
        {props.mainImage && mainImage.asset && (
          <AspectImage
            ratio={16 /6}
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((6 / 16) * 1200))
              .fit("crop")
              .url()}
            alt={mainImage.alt}
          />
        )}
        <Heading sx={{
          pt: 4,
        }}>{title}</Heading>

        {categories && categories.length > 0 && categoriesButtons}
      </Box>

      {_rawProjectBrief && (
        <Flex pb={2} flexDirection="column" mx="auto">
          <Styled.h3 sx={{
            color: lighten('secondary', .1),
            fontWeight: 100,
            mx: [0, 'auto']
          }}>Project Description</Styled.h3>
          <BlockContent style={{ mx: 'auto' }} blocks={_rawProjectBrief || []} />
        </Flex>
      )}

      {_rawProjectBreakdown && (
        <Flex pb={2} flexDirection="column" mx="auto">
          <Styled.h3 sx={{
            color: lighten('secondary', .1),
            fontWeight: 100,
            mx: [0, 'auto']
          }}>Project Breakdown</Styled.h3>
          <BlockContent style={{ mx: 'auto' }} blocks={_rawProjectBreakdown || []} />
        </Flex>
      )}


      {collaborators && collaborators.length > 0 && (
        <RoleList items={collaborators} title="Team" />
      )}


      {uniqueAccolades && uniqueAccolades.length > 0 && (
        <Box pb={2} sx={{ textAlign: 'center' }}>
          <Styled.h3 sx={{
            color: lighten('secondary', .1),
            fontWeight: 100,
            mx: [0, 'auto']
          }}>Exhibitions & Awards</Styled.h3>
          <Grid as="ul" gap={2} columns={[1, uniqueAccolades.length > 1 ? 2 : 1]} sx={{ listStyle: 'none', padding: 0 }}>
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

      {filteredProjects && filteredProjects.length > 0 && (
        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "muted",
            mt: 4,
            textAlign:"center",
          }}
        >
          <Styled.h3>Related Projects</Styled.h3>
 {categories && categories.length > 0 && categoriesButtons}
          <ProjectPreviewGrid nodes={filteredProjects} />
        </Box>
      )}
    </Container>
  );
}

export default Project;
