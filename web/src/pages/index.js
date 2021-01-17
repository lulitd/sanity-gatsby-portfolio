import React from "react";
import { graphql,Link} from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
// import Layout from "../containers/layout";
import { Heading, Text, Flex, Box } from "rebass";
import { Styled, jsx, Image, AspectImage, Grid, Button } from "theme-ui";
import ThemedLink from "../components/ThemedLink";
import { lighten, alpha } from "@theme-ui/color";
import PostPreviewGrid from "../components/post-preview-grid";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { flip } from "ramda";
import Doodles from "../components/doodle";
import { useThemeUI } from "theme-ui";

//@jsx jsx
export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      jumboName
      jumboDescription
      jumboTag
      author {
        name
        image {
          crop {
            _key
            _type
            top
            bottom
            left
            right
          }
          hotspot {
            _key
            _type
            x
            y
            height
            width
          }
          asset {
            _id
          }
          alt
        }
      }
    }
    projects: allSanityProject(
      limit: 6
      sort: { fields: [endedAt], order: DESC }
      filter: {
        slug: { current: { ne: null } }
        publishedAt: { ne: null }
        featured: { eq: false }
      }
    ) {
      edges {
        node {
          _id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          subtitle
          slug {
            current
          }
        }
      }
    }
    posts: allSanityPost(limit: 4, sort: { fields: [publishedAt], order: DESC }) {
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
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
        }
      }
    }
  }
`;

const createHeroBG = (colors) => {
  return <Doodles colors={colors} />;
};

const createTriangle = (colors,url) => {
  return (
    <Link
       to ={"/#"+url}
      sx={{
        width: [33],
        height: [33],
        borderStyle: "solid",
        backgroundColor: "transparent",
        borderColor: colors.primary,
        borderLeftColor: "transparent",
        borderTopColor: "transparent",
        borderWidth: "0.15rem",
        marginX: "auto",
        position: "absolute",
        transform: "translate(-50%, -50%) rotate(45deg)",
        left: "50%",
        bottom: "10%",
        transitionDuration: "0.33s",
        "&:hover": {
          borderColor: colors.secondary,
        },
      }}
    ></Link>
  );
};

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <>
        <GraphQLErrorList errors={errors} />
      </>
    );
  }

  const site = (data || {}).site;
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : [];

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
  const featuredURL = (projectNodes && projectNodes.length > 0)?"featured-projects":((postNodes && postNodes.length > 0)?"featured-posts":null);

  const tri = featuredURL? createTriangle(colors,featuredURL): null;
  return (
    <>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container
        sx={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          backgroundImage: (t) => `
          radial-gradient(
            circle at 50% 25%,
            ${alpha("background", 1)(t)} 0%,
            ${alpha("background", 1)(t)} 25%,
            ${alpha("background", 0)(t)}40%,
            ${alpha("background", 1)(t)}60%,
            ${alpha("background", 1)(t)} 100%
          )
        `,
        }}
      >
        {bg}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: ["0.25fr 3fr 0.25fr", "0.5fr 2fr 0.5fr", "0.5fr 2fr 0.5fr"],
            gridTemplateRows: ["0.125fr 1fr 0.125fr", "0.5fr 2fr 0.5fr", "0.5fr 1fr 0.5fr"],
            gridTemplateAreas: "'. . .' '. Header-Content .' '. . .'",
          }}
        >
          <Box
            sx={{
              gridArea: "Header-Content",
            }}
          >
            <Heading variant="subheading" fontWeight="body" fontSize={[2, 3]} pb={0}>
              Hi my name is
              <Text as="span" pb={0} display="block" variant="title" fontSize={[36, 48, 64]}>
                {site.jumboName}.
              </Text>
            </Heading>
            <Heading fontWeight="400" fontSize={[24, 36]}>
              {site.jumboTag}
            </Heading>
            <Text pt={4} pb={2} fontWeight={300} display="table" fontSize={[1, 2, 3]}>
              {site.jumboDescription}
            </Text>
            <Box
              pt={4}
              sx={{
                textAlign: "center",
                "& a": {
                  mr: 4,
                  mb: 2,
                  display: "inline-block",
                },
              }}
            >
              <ThemedLink block="true" to="/archive" variant="semiOutlineBtn" fontSize={2}>
                View Projects
              </ThemedLink>
              <ThemedLink block="true" to="/about" variant="outlineBtn" fontSize={2}>
                Get To Know Me
              </ThemedLink>
            </Box>
          </Box>
        </Box>
        {tri}
      </Container>

      {projectNodes && projectNodes.length > 0 && (
        <Container mb={5}>
          <Styled.h2 id="featured-projects">Featured Projects</Styled.h2>
          <ProjectPreviewGrid
            columns={[1, 2, null]}
            nodes={projectNodes}
            browseMoreHref="/archive/"
          />
        </Container>
      )}

      {postNodes && postNodes.length > 0 && (
        <Container mb={5}>
          <Styled.h2 id="featured-posts">Latest Posts</Styled.h2>
          <PostPreviewGrid columns={[1, 2, 1]} nodes={postNodes} browseMoreHref="/posts/" />
        </Container>
      )}
    </>
  );
};

export default IndexPage;
