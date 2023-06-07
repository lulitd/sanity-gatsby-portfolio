import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import { SEO } from "../components/seo";
import Layout from "../containers/layout";
import BlockContent from "../components/block-content";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import SocialsFromBio from "../components/socials-from-bio";
import { Label, Box, Flex, Heading, Image, Grid } from "theme-ui";
import { alpha } from "@theme-ui/color";
import SanityImage from "gatsby-plugin-sanity-image";

export const query = graphql`
  query AboutQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      author {
        github
        instagram
        twitter
        linkedin
        image {
          ...ImageWithPreview
          asset {
            altText
            description
          }
        }
        _rawBio
      }
    }
  }
`;

const AboutPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;

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

  return (
    <Layout>
      <Container>
        <Grid columns={[1,1, '2fr 1fr']} gap={3} >
          <Box mx={["auto","auto","0"]}>
            <Heading as="h3" variant={'text.barcodes'} sx={{ fontSize: 8 }}>About</Heading>
            {author._rawBio && (
              <BlockContent blocks={author._rawBio || []} style={{
                width: ["45ch", "50ch", "fit-content"]
              }} />
            )}
          </Box>
          <Box as="aside">
            {profileImage && profileImage.asset && (
              <Box
                sx={{
                  display: ["none", null, "block"],
                  maxHeight: 450,
                }}
              >
                <SanityImage
                  {...profileImage}
                  width={450}
                  height={450}
                  sx={{
                    minHeight: 0,
                    maxHeight: "100%",
                    backgroundColor: "transparent",
                    border: "solid currentColor",
                    borderWidth: "2",
                    borderRadius: "default",
                    color: "muted",
                    maxWidth:"100%",
                  }}
                  alt={profileImage.asset.altText}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Container>
    </Layout>
  );
};

export default AboutPage;

export const Head = () => (
  <SEO title="About" />
)

