import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
// import Layout from "../containers/layout";
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
        tags
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



const AboutImageRef = React.createRef();
const LabelRef = React.createRef();
let TextRefs = [];

const Animate = () => {
  
  const delay = 0.3; 
  const dur = 1; 
  const fullDur = TextRefs.length* (delay+dur+dur);
  const tl = gsap.timeline({ repeat: -1, defaults:{duration:dur}});

  TextRefs.forEach((e, i) => {
    tl.fromTo(e.current, { opacity: 0 }, { opacity: 1, repeat: 1, yoyo: true, yoyoEase: true ,repeatDelay:delay})
  });

    tl.fromTo(AboutImageRef.current, { rotateY: -20 }, { repeat: 1,rotateY:20 ,yoyo: true,duration:fullDur*0.5,ease:"none" ,repeatDelay:0},0)
  //  tl.fromTo(LabelRef.current, { rotateY: 10 }, { repeat: 1,rotateY:-10 ,yoyo: true,duration:3.45,ease:"none" ,repeatDelay:0},0)
  .fromTo(
  LabelRef.current,
  { rotateY: -5, translateX: "5%", translateY: "25%", translateZ: 25 },
  { rotateY: 5, translateZ: 50, translateX: "12.5%", translateY: "100%",repeat:1 ,yoyo: true,duration:fullDur*0.5,ease:"none" ,repeatDelay:0},
  0);
};

const CreateTags = (tags) => {


  
  return (
    tags.map((label, i) => {
      TextRefs.push(React.createRef());
      return (
        <Box ref={TextRefs[i]} key={i}>{label}</Box>
      );
    })
  );
};
const AboutPage = (props) => {
  const { data, errors } = props;

  useEffect(Animate, [AboutImageRef, LabelRef, TextRefs]);

  if (errors) {
    return (
      <>
        <GraphQLErrorList errors={errors} />
      </>
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

  const tags = CreateTags(author.tags);

  return (
    <>
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
                    minHeight:"2rem",

                    "& div": {
                     display:"inline-block",
                     position:"absolute",
                     left:"50%",
                     top:"50%",
                     transform:"translate(-50%,-50%)",
                     width:["100%"], 
                    },
                  }}
                >
                  {tags}
                </Box>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default AboutPage;
