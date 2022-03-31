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
import { AspectImage, Image, Styled, Grid, jsx, Card } from "theme-ui";
import ThemedLink from "./ThemedLink";
import { darken, alpha, lighten } from '@theme-ui/color'
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
              <Styled.li sx={{ display: "inline-block", pr: [2], py: [3] }} key={`li_${cat._id}`}>
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

  const bgUrl = props.mainImage && mainImage.asset && imageUrlFor(buildImageObj(mainImage))
    .width(1200)
    .height(Math.floor((2 / 5) * 1200))
    .blur(5)
    .url();

  return (
    <Container as="article" sx={{ px: [0, 0, 0], m: 0, maxWidth: '100vw' }}>

      {/* Title and Image */}
      <Flex flexDirection="column" mx="auto" pb={[0]} sx={{
        height: ['calc(100vh - 60px)', '75vh'],
        textAlign: 'center',
        backgroundColor: "red",
        background: ` url(${bgUrl})`,
        backgroundSize: "cover",
        alignItems: "center",
        justifyContent: "center",
        backgroundAttachment: "fixed",
      }}>

        <Card
          sx={{
            width: "50vh",
            height: "30vh",
            borderWidth: [4],
            borderStyle: 'solid',
            borderColor: 'primary',
            backgroundColor: alpha("background", 0.7),
            p: [2],
            display: 'flex',
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
          }}>

          <Box width='32ch'>
            <Heading
              sx={{
                color: lighten("primary", 0.2),
                textTransform: "uppercase",

              }}
              fontSize={[5, 6]}>{title}</Heading>
          </Box>
        </Card>
      </Flex>
      <Container>
        {categories && categories.length > 0 && categoriesButtons}
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
              mx: [0, 'auto'],
              textAlign: "center"
            }}>Project Breakdown</Styled.h3>
            <BlockContent style={{ mx: 'auto' }} blocks={_rawProjectBreakdown || []} />
          </Flex>
        )}


        <Flex justifyContent="space-evenly" flexDirection={["column", "column", "row"]}>
          {collaborators && collaborators.length > 0 && (
            <RoleList items={collaborators} title="Team" />
          )}


          {uniqueAccolades && uniqueAccolades.length > 0 && (
            <Flex pb={2}
              flexDirection="column" alignItems="center" width="fitContent">
              <Styled.h3 sx={{
                color: lighten('secondary', .1),
                fontWeight: 100,
              }}>Exhibitions & Awards</Styled.h3>
              <Flex
                as="ul"
                flexDirection="column"
                sx={{
                  listStylePosition: "inside",
                  listStyle: "none",
                  padding: 0,
                  textAlign: "center"
                }}
              >  {uniqueAccolades.map((accolade) => {
                let label = "";
                label += `${accolade.date.split("-")[0]}: `;
                label += accolade.title;
                label += accolade.event ? `,\n${accolade.event}` : "";
                return (
                  <Box as="li" key={accolade._id} sx={{
                    "& :last-child": {
                      pb: 2,
                    },
                  }}>
                    <Text
                      sx={{
                        whiteSpace: "pre-wrap",
                      }}
                      fontWeight="bolder"
                      fontSize={[2, 1, 2]}
                    >{`${label}`}</Text>
                    <Text fontSize={[2, 1, 2]} sx={{
                      color: lighten('primary', .1)
                    }}>
                      {accolade.address}
                    </Text>
                  </Box>
                );
              })}
              </Flex>
            </Flex>
          )}
        </Flex>
        {filteredProjects && filteredProjects.length > 0 && (
          <Box
            sx={{
              borderTop: "1px solid",
              borderColor: "muted",
              mt: 4,
              textAlign: "center",
            }}
          >
            <Styled.h3 sx={{
              color: lighten('secondary', .1)
            }}>Related Projects</Styled.h3>
            {categories && categories.length > 0 && categoriesButtons}
            <ProjectPreviewGrid nodes={filteredProjects} />
          </Box>
        )}
      </Container>
    </Container>
  );
}

export default Project;
