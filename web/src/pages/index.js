import React from "react";
import { graphql, Link } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { Heading, Text, Flex, Box } from "rebass";
import { Styled, jsx, Image, AspectImage, Grid } from "theme-ui";
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
  return (
    <Doodles colors={colors} />
    //     <>
    //       <css-doodle>
    //         {`
    //       :doodle {
    //         @grid: 24/1200;
    //         width: 100%; height:calc(100vh - 81px);
    //         z-index: -2;
    //         position: absolute;
    //         left:0;
    //         top:0;
    //         grid-gap: 0.125em;
    //       }
    //       border-radius:50%;
    //       border: 2px solid;
    //       opacity:0.4;
    //       width:1rem;
    //       height:1rem;
    //       animation: color-change-3x 2s linear infinite alternate both;
    //       animation-delay: @rand(1000ms);

    //       @keyframes color-change-3x {
    //         0% {
    //           border-color: @pick(${colors.primary},${colors.primary},${colors.secondary},${colors.background},${colors.muted});
    //         }
    //         50% {
    //           border-color: @pick(${colors.background},${colors.primary},${colors.secondary},${colors.muted});
    //         }
    //         100% {
    //           border-color: @pick(${colors.primary},${colors.secondary},${colors.secondary},${colors.background},${colors.muted});
    //         }
    //       }
    // `}
    //       </css-doodle>
    //       <css-doodle>
    //         {`
    //         :doodle {
    //           @grid: 1x6 / 100%;
    //           position: absolute;
    //           left: 50%;
    //           top: 50%;
    //           transform: translate(-50%,-50%);
    //           @size:1500px;
    //           opacity:1;
    //           z-index: -1;
    //         }

    //         @place-cell: center;
    //         @size: calc(10% + @i * 7.5%);

    //         border-radius: 100%;
    //         border-style: dashed;
    //         border-width: 2px;

    //         border-color:
    //           hsla(
    //             174, @r(40%,50%), @r(70%, 82%), @r(50%, 90%)
    //           )
    //           transparent
    //         ;

    //         background-color: ${alpha(colors.primary, 0.5)};
    //         will-change: transform;
    //         animation: myanimation @r(4s, 15s) linear alternate infinite;

    //         @keyframes myanimation {
    //           from { transform: rotate(@r(360deg)) }
    //           to { transform: rotate(@r(360deg)) }
    //         }
    //     `}
    //       </css-doodle>
    //     </>
  );
};

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
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

  const profileImage = author.image;
  const imgurl = imageUrlFor(buildImageObj(profileImage))
    .fit("fill")
    .width(225)
    .invert(true)
    .height(400)
    .url();
  const context = useThemeUI();
  const { colors } = context.theme;
  const bg = createHeroBG(colors);
  return (
    <Layout mainStyle={{ display: "flex", flexDirection: "column" }}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container
        sx={{
          position: "relative",
          height: "calc(100vh - 81px)",
          overflow: "hidden",
          backgroundImage: (t) => `
          linear-gradient(
            to bottom,
            ${alpha("primary", 0)(t)},
            ${alpha("background", 1)(t)}
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
            <Text pt={4} pb={2} display="table" fontSize={[1, 2, 3]}>
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
      </Container>

      {projectNodes && projectNodes.length > 0 && (
        <Container mb={5}>
          <Styled.h2>Featured Projects</Styled.h2>
          <ProjectPreviewGrid
            columns={[1, 2, null]}
            nodes={projectNodes}
            browseMoreHref="/archive/"
          />
        </Container>
      )}

      {postNodes && postNodes.length > 0 && (
        <Container mb={5}>
          <Styled.h2>Latest Posts</Styled.h2>
          <PostPreviewGrid columns={[1, 2, 1]} nodes={postNodes} browseMoreHref="/posts/" />
        </Container>
      )}
    </Layout>
  );
};

export default IndexPage;
