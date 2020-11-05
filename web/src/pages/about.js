import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import BlockContent from "../components/block-content";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import SocialsFromBio from "../components/socials-from-bio";
import { Label, Styled } from "theme-ui";
import { alpha } from "@theme-ui/color";
import { Box, Flex, Image } from "rebass";
import gsap from "gsap";

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

// const Move = (e) => {
//   let xAxis = (window.innerWidth * 0.5 - e.pageX) * 0.05;
//   let yAxis = (window.innerHeight * 0.5 - e.pageY) * 0.05;
//   AboutImageRef.current.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
//   LabelRef.current.style.transform = `translate(12.5%,50%) translateZ(25px)`;
// }

// const StopMoving = () => {
//   AboutImageRef.current.style.transition='all 0.75s ease-out';
//   AboutImageRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
//   LabelRef.current.style.transform = `translate(12.5%,50%)  translateZ(0px)`;
// }
// const PrepForMove = () => {
//   AboutImageRef.current.style.transition='none';
// }

const AboutImageRef = React.createRef();
const LabelRef = React.createRef();

const Animate = () => {
  const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 5 } });
  tl.fromTo(AboutImageRef.current, { rotateY: 10 }, { rotateY: -10 }).fromTo(
    LabelRef.current,
    { rotateY: -5, translateX: "5%", translateY: "25%", translateZ: 50 },
    { rotateY: 5, translateZ: 150, translateX: "12.5%", translateY: "100%" },
    0
  );
};
const AboutPage = (props) => {
  const { data, errors } = props;

  useEffect(Animate, [AboutImageRef, LabelRef]);

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
    <Layout mainStyle={{ perspective: "1000px" }}>
      <SEO title="About" />
      <Container>
        <Styled.h1>About</Styled.h1>
        <Flex>
          <Box flex="2" minWidth={["fit-content", 0]} pr={[0, 4]}>
            {author._rawBio && (
              <div>
                <BlockContent blocks={author._rawBio || []} />
              </div>
            )}
          </Box>
          <Box
            flex="1"
            as="aside"
            p="5"
            sx={{
              display: ["flex"],
              flexDirection: "column",
              alignItems: "center",
              // bg: 'red'
            }}
          >
            {author.image && profileImage.asset && (
              <Box
                width="100%"
                ref={AboutImageRef}
                sx={{
                  display: ["none", "block"],
                  maxHeight: 450,
                  position: "relative",
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src={imageUrlFor(buildImageObj(profileImage))
                    .fit("clip")
                    .width(450)
                    .height(450)
                    .url()}
                  sx={{
                    minHeight: 0,
                    maxHeight: "100%",
                    backgroundColor: "transparent",
                    border: "solid currentColor",
                    borderWidth: "2",
                    borderRadius: "default",
                    color: "muted",
                  }}
                  alt={profileImage.alt}
                />
                <Box
                  id="profile-label-container"
                  ref={LabelRef}
                  sx={{
                    border: "0.125rem solid white",
                    borderColor: "background",
                    p: 1,
                    textAlign: "center",
                    position: "absolute",
                    zIndex: 50,
                    bottom: "0%",
                    right: "0%",
                    backgroundColor: alpha("secondary", 0.95),

                    fontSize: [1, 2, 3],
                    fontFamily: "nav",
                    textTransform: "uppercase",
                    color: "background",
                    letterSpacing: 0.5,
                    wordSpacing: 3,
                    borderTopLeftRadius: "default",
                    borderBottomRightRadius: "default",
                    width: ["16ch"],
                  }}
                >
                  {/* <span>Maker </span>
                  <span>Developer </span> */}
                  <span>Creative Coder </span>
                </Box>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default AboutPage;
