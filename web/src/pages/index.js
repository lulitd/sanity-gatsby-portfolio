import React from "react";
import { graphql } from "gatsby";
import { useThemeUI, Grid, Heading, Text, Paragraph, Flex, Box } from "theme-ui";
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
              gatsbyImageData(fit: FILLMAX, placeholder: BLURRED, width: 450)
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
    posts: allSanityPost(limit: 4, sort: { publishedAt: DESC }) {
      edges {
        node {
          _id
          title
          subtitle
          publishedAt
          _updatedAt
          slug {
            current
          }
          author {
            name
          }
          categories {
            title
          }
          mainImage {
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

  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const author = (site || {}).author;
  if (!author) {
    throw new Error(
      'Missing author in "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const context = useThemeUI();
  const { colors } = context.theme;
  const bg = createHeroBG(colors);

  return (
    <>
      <Container
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            position: "absolute",
            inset: 0,
            zIndex: -1,
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundImage: (t) => `
              linear-gradient(
             60deg,
              ${alpha("background", 1)(t)} 0%,
              ${alpha("background", 0.75)(t)} 25%,
              ${alpha("background", 0.9)(t)}40%,
              ${alpha("background", 0.5)(t)}60%,
              ${alpha("background", 0.75)(t)}80%,
              ${alpha("background", 1)(t)} 100%
            )
          `,
            },
          }}
        >
          {bg}
        </Box>
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
              textTransform: "uppercase",
              color: "primary600",
            }}
          >
            {site.jumboDescription}
          </Text>
          <Heading sx={{ my: [2, 2, 1], textWrap: "balance" }}>{site.jumboTag}</Heading>
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
            <ThemedLink to="/contact" variant="fillBtn">
              Let's Chat!
            </ThemedLink>
            <ThemedLink to="/projects" variant="outlineBtn">
              View Projects
            </ThemedLink>
          </Box>
        </Box>
      </Container>

      <Container>
        <LogoScroller
          logos={featuredLogos}
          title={"Clients & projects I've had the pleasure of working with"}
          logoHeight={30}
          duration={60}
          backgroundColor="primary"
        />
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
      {/* <Container sx={{ my: 4 }}>
        <CardRow />
      </Container> */}
      {postNodes && postNodes.length > 0 && (
        <Container mb={5}>
          <Heading as="h3" id="featured-posts" fontSize={[8]}>
            Latest Posts
          </Heading>
          <PostPreviewGrid columns={[1, 2, 1]} nodes={postNodes} browseMoreHref="/posts/" />
        </Container>
      )}

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
            <StatusPill
              currentStatus={site.statusAvailablity}
              message={site.statusMessage}
              contactInfo={site.contactEmail}
            />
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
                I’ve collaborated with independent artists, creative teams, startups, and global
                brands, developing work that has been showcased in museums, galleries, festivals,
                and international exhibitions.
              </Paragraph>
              <Paragraph>
                I love designing systems with just enough structure to hold an idea and just enough
                freedom to let it surprise us.
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
              <ThemedLink to="/contact" variant="fillBtn">
                Let's chat
              </ThemedLink>
              <ThemedLink to="/about" variant="outlineBtn">
                Get To Know Me
              </ThemedLink>
            </Box>
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default IndexPage;

export const Head = () => <SEO />;
