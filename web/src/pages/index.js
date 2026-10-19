import React from "react";
import { graphql } from "gatsby";
import { useThemeUI, Grid, Heading, Text, Paragraph, Flex, Box, Card } from "theme-ui";
import { alpha } from "@theme-ui/color";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from "../lib/helpers";
// import SanityImage from "gatsby-plugin-sanity-image";
import { SEO } from "../components/seo";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import ThemedLink from "../components/atoms/ThemedLink";
import PostPreviewGrid from "../components/post-preview-grid";
import LogoScroller from "../components/logo-scroller";
import Doodles from "../components/doodle";
import CardRow from "../components/card-row";
import StatusPill from "../components/status-pill";
import SanityImage from "../components/atoms/image";
import WorkingApproach from "../components/work-approach";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      jumboName
      jumboDescription
      jumboTag
      statusAvailablity
      statusMessage
      contactEmail
      featuredLogos {
        asset {
          gatsbyImageData(fit: SCALE, placeholder: BLURRED, height: 50)
          title
          altText
        }
        hotspot {
          x
          y
        }
      }
      archive {
        _id
        title
      }
      author {
        github
        instagram
        twitter
        linkedin
        name
        image {
          asset {
            gatsbyImageData(fit: FILLMAX, placeholder: BLURRED, width: 450)
            title
            altText
          }
          hotspot {
            x
            y
          }
        }
      }
      jumboImage {
        asset {
          gatsbyImageData(fit: FILLMAX, placeholder: BLURRED, width: 450)
          title
          altText
        }
        hotspot {
          x
          y
        }
      }
    }
    projects: allSanityProject(
      limit: 4
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null }, featured: { eq: true } }
    ) {
      edges {
        node {
          publishedAt
          _id
          mainImage {
            asset {
              gatsbyImageData(fit: MIN, placeholder: BLURRED, width: 600)
              title
              altText
            }
            hotspot {
              x
              y
            }
          }
          thumbImage {
            asset {
              gatsbyImageData(fit: FILLMAX, placeholder: BLURRED, width: 450)
              title
              altText
            }
            hotspot {
              x
              y
            }
          }
          title
          subtitle
          excerpt
          roles {
            fieldTitle
            fieldInfo
          }
          categories {
            title
          }
          slug {
            current
          }
        }
      }
    }
  }
`;

const createHeroBG = (colors) => {
  return <Doodles colors={colors} />;
};

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }

  const site = (data || {}).site;
  const archiveOrder = (site || {}).archive;

  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  const profileImage = site.author.image;
  const featuredLogos = site.featuredLogos;
  const jumboImage = site.jumboImage;

  // const postNodes = (data || {}).posts
  //   ? mapEdgesToNodes(data.posts)
  //       .filter(filterOutDocsWithoutSlugs)
  //       .filter(filterOutDocsPublishedInTheFuture)
  //   : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  const author = (site || {}).author;
  if (!author) {
    throw new Error(
      'Missing author in "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  const context = useThemeUI();
  const { colors } = context.theme;

  return (
    <>
      <Container
        sx={{
          position: "relative",
          textAlign: ["center", "center", "left"],
        }}
      >
        <Grid gap={1} columns={[1, 1, "minMax(0,2fr) minMax(0,1.5fr)"]}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              my: [1, 2, 3],
              pt: [2, 4, 4],
            }}
          >
            <Text
              sx={{
                opacity: 0.7,
                textWrap: "balance",
                lineHeight: "1.25rem",
                color: "primary600",
              }}
            >
              {site.jumboDescription}
            </Text>
            <Heading
              sx={{
                my: [5],
                textWrap: "balance",
                maxWidth: "25ch",
                fontWeight: "100",
              }}
            >
              {site.jumboTag}
            </Heading>
            <Box
              sx={{
                mt: 3,
                mb: [2, 4, 4],
                "& a": {
                  mr: 3,
                  display: "inline-block",
                },
              }}
            >
              <ThemedLink to="/projects" variant="fillBtn">
                View Selected Work
              </ThemedLink>
              <ThemedLink to="/contact" variant="outlineBtn">
                Get in touch
              </ThemedLink>
            </Box>
            <Text
              sx={{
                opacity: 0.7,
                textWrap: "balance",
                lineHeight: "1.25rem",
                textTransform: "uppercase",
                color: "primary600",
              }}
            >
              Toronto-based • Open to new opportunities
            </Text>
          </Box>

          <SanityImage
            image={jumboImage}
            imgStyle={{ objectFit: "contain" }}
            sx={{
              display: ["none", "none", "block"],
              maxWidth: "100%",
            }}
          />
        </Grid>
      </Container>

      <Container sx={{ my: 4 }}>
        <CardRow />
      </Container>

      {projectNodes && projectNodes.length > 0 && (
        <Container>
          <ProjectPreviewGrid
            columns={[1, 2, null]}
            nodes={projectNodes}
            order={archiveOrder}
            title="Highlighted Projects"
            browseMoreHref="/projects/"
          />
        </Container>
      )}

      {/* {postNodes && postNodes.length > 0 && (
        <Container mb={5}>
          <Heading as="h3" id="featured-posts" fontSize={[8]}>
            Latest Posts
          </Heading>
          <PostPreviewGrid columns={[1, 2, 1]} nodes={postNodes} browseMoreHref="/posts/" />
        </Container>
      )} */}

      <Container my={4}>
        <LogoScroller
          logos={featuredLogos}
          title={"Clients & projects I've had the pleasure of working with"}
          logoHeight={30}
          duration={60}
          backgroundColor="primary"
        />
      </Container>

      <Container>
        <Grid columns={["none", "none", "1.25fr 2fr"]} gap={3} mb={3}>
          {profileImage && profileImage.asset && (
            <Flex
              sx={{
                display: ["none", "none", "flex"],
              }}
            >
              <SanityImage
                image={profileImage}
                sx={{
                  backgroundColor: "transparent",
                  border: "solid currentColor",
                  borderWidth: 1,
                  borderRadius: "default",
                  color: "primary",
                  objectFit: "cover",
                  maxWidth: "100%",
                }}
              />
            </Flex>
          )}
          <Box mx="auto" p={5}>
            <Heading as="h3" sx={{ my: 0, pt: 3 }}>
              Hi, I'm Lalaine!
            </Heading>
            <Flex
              sx={{
                maxWidth: "75ch",
                textWrap: "pretty",
                py: 5,
                flexDirection: "column",
                gap: "3",
              }}
            >
              <Paragraph>
                I’m a Toronto-based creative technologist that turns ambitious ideas into
                interactive realities.
              </Paragraph>
              <Paragraph>
                In practice, that means I bridge the space between design and development. I build
                websites, apps, games, and real-time experiences, often stepping into multiple roles
                along the way. I’m comfortable shaping the creative direction of a project and
                architecting the technical framework behind it.
              </Paragraph>
              <Paragraph>
                I’ve worked with artists, creative teams, startups, cultural organizations, and
                global brands, developing work that has been showcased in museums, galleries,
                festivals, and international exhibitions.
              </Paragraph>
            </Flex>
            <Box
              sx={{
                "& a": {
                  mr: 2,

                  display: "inline-block",
                },
              }}
            >
              <ThemedLink to="/about" variant="outlineBtn">
                More about me
              </ThemedLink>
              <ThemedLink to="/" variant="fillBtn">
                View resume
              </ThemedLink>
            </Box>
          </Box>
        </Grid>
      </Container>

      <WorkingApproach />
    </>
  );
};

export default IndexPage;

export const Head = () => <SEO />;
