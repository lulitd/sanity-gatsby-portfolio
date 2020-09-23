import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import BlockContent from "../components/block-content";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import SocialsFromBio from "../components/socials-from-bio";
import { Styled } from 'theme-ui'
import { Box, Flex, Image } from 'rebass'

export const query = graphql`
  query AboutQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      author {
        github
        instagram
        twitter
        linkedin
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
        _rawBio
      }
    }
  }
`;

const AboutPage = props => {
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
      <SEO title="About" />
      <Container>
        <Styled.h1 >About</Styled.h1>
        <Flex>
          <Box flex='2' minWidth={['fit-content', 0]} pr={[0, 4]}>
            {author._rawBio && (
              <div>
                <BlockContent blocks={author._rawBio || []} />
              </div>
            )}
          </Box>
          <Box flex='1' as='aside' px='2'
            sx={{
              display: ['flex'],
              flexDirection: "column",
              alignItems: "center"
            }} >
            {author.image && profileImage.asset && (
              <Box width='100%' sx={{
                display: ['none', 'block'],
                maxHeight:365
              }}>
                <Image
                  src={imageUrlFor(buildImageObj(profileImage))
                    .fit("clip")
                    .url()}
                  sx={{
                    minHeight:0,
                    maxHeight:"100%"
                  }}
                  alt={profileImage.alt}
                />
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default AboutPage;
