import { format, distanceInWords, differenceInDays, parseISO } from "date-fns";
import React from "react";
import { Link } from "gatsby";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import Container from "./container";
import RoleList from "./role-list";
import SocialsFromBio from "./socials-from-bio";
import ProjectPreviewGrid from "./project-preview-grid";
import { AspectImage, Image, Grid, Card, Heading, Box, Text, Button, Flex } from "theme-ui";
import { Themed } from '@theme-ui/mdx';
import ThemedLink from "./ThemedLink";
import { darken, alpha, lighten } from '@theme-ui/color'
import { FaAutoprefixer } from "react-icons/fa";

function Project(props) {
  const {
    _rawProjectBrief,
    _rawProjectBreakdown,
    title,
    subtitle,
    categories,
    members,
    accolades,
    mainImage,
    relatedProjects,
    awards,
    youtube,
    website,
    instagram,
    github,
    twitter,
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

  let stats = 0;
  if (collaborators && collaborators.length > 0) stats++;
  if (uniqueAccolades && uniqueAccolades.length > 0) stats++;
  const categoriesButtons =
    <Box pb={2} sx={{ textAlign: 'center' }}>
      <ul sx={{
        listStyle: "none",
        padding: 0,
      }}>
        {categories.reduce((acm, cat) => {
          if (cat.projectFilter) {
            const el = (
              <Themed.li sx={{ display: "inline-block", pr: [2], py: [3] }} key={`li_${cat._id}`}>
                <ThemedLink
                  block
                  to={`/projects/category/${cat.slug.current}`}
                  variant="outlineBtn"
                  key={cat._id}
                >
                  #{cat.title}
                </ThemedLink>
              </Themed.li>
            );
            acm.push(el);
          }
          return acm;
        }, [])}
      </ul>
    </Box>;

  const socialIcons = <SocialsFromBio bio={props}
    iconStyle={{ m: [1] }}
    sx={{
      display: "flex",
      placeContent: "center",
      pt:3,
    }} />;

  const bgUrl = props.mainImage && mainImage.asset && imageUrlFor(buildImageObj(mainImage))
    .width(1080)
    .height(Math.floor((2 / 5) * 1080))
    .blur(5)
    .url();

  const statStyle = stats > 1 ? null : {
    borderRight: "1px solid red",
    borderWidth: [0, 0, 1],
    borderColor: "secondary",
    paddingRight: [0, 0, 3],
    marginLeft: 3,
  };
  return (
    <Container as="article" sx={{ px: [0], maxWidth: '100%' }}>
      {/* Title and Image */}
      <Grid
        sx={{
          minHeight: "100px", background: (t) => `
          linear-gradient(
            90deg,
            ${alpha('background', 1)(t)} 0%,
            ${alpha('background', 0.7)(t)} 40%,
            ${alpha('secondary', 0.0)(t)} 100%
          ),
          url(${bgURL})
        `,
          textAlign: 'center',
          height: ['75vh'],
          gridTemplateColumns: ["1fr 6fr 1fr","1fr 4fr 1fr","1fr 2fr 1fr","1fr 1fr 1fr"],
          gridTemplateRows: ["1fr 2fr 1fr","1fr 2fr 1fr","1fr 2fr 1fr","1fr 1fr 1fr"],
          backgroundColor: "third",
          background: [bgUrl ? `url(${bgUrl})` : (t) => `
        linear-gradient(
          to bottom,
          ${alpha('secondary', 0.25)(t)},
          ${alpha('third', 0.25)(t)}
        )
      `],
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPositionY: "center",
          backgroundRepeat: "no-repeat",
        }}>
        <Card
          sx={{
            display: "flex",
            gridArea: "2/2",
            borderWidth: [2, null, 3],
            borderStyle: 'solid',
            borderColor: 'primary',
            backgroundColor: alpha("background", 0.5),
            backdropFilter: "blur(2em)",
          }}>
          <Box sx={{
            m: "auto",
            p: [2],
            maxWidth: "50ch",
          }}>
            <Heading
              sx={{
                color: "primary",
                textTransform: "uppercase",
                fontSize: [5, 6]
              }}>
              {title}
            </Heading>
            <Heading
              variant="subheading"
              sx={{
                fontFamily: "body",
                fontSize: [3, 4]
              }}>
              {subtitle}
            </Heading>
            {socialIcons}
          </Box>
        </Card>
      </Grid>
      {categories && categories.length > 0 && categoriesButtons}
      <Container sx={{ mx: "auto" }}>
        {_rawProjectBrief && (
          <Grid columns={[1, 1, "1fr 1fr 3fr 1fr"]} gap={[1, 2, 2]} sx={{
            px: 1,
            mb: 5,
          }}>
            <Themed.h3 sx={{
              color: "secondary",
              textAlign: ["center", "center", "right"],
              minWidth: "200px",
              gridColumn: [1, 1, 2],
            }}>Project Description</Themed.h3>
            <BlockContent style={{
              mx: ["auto", "auto", 0],
              borderLeft: "1px solid red",
              borderWidth: [0, 0, 1],
              borderColor: "secondary",
              paddingLeft: [0, 0, 3],
            }} blocks={_rawProjectBrief || []} />
          </Grid>
        )}

        {_rawProjectBreakdown && (
          <Grid columns={[1, 1, "1fr 1fr 3fr 1fr"]} gap={[1, 2, 2]} sx={{
            px: 1,
            my: 5,
          }}>
            <Themed.h3 sx={{
              color: "secondary",
              textAlign: ["center", "center", "right"],
              minWidth: "200px",
              gridColumn: [1, 1, 2],
            }}>Project Breakdown</Themed.h3>
            <BlockContent style={{
              mx: ["auto", "auto", 0],
              borderLeft: "1px solid red",
              borderWidth: [0, 0, 1],
              borderColor: "secondary",
              paddingLeft: [0, 0, 3],
            }} blocks={_rawProjectBreakdown || []} />
          </Grid>
        )}
        {stats > 0 && (<Grid columns={[1, 1, "1fr 1fr 3fr 1fr"]} gap={[1, 2, 2]}
          sx={{
            placeContent: "center",
            my: 5
          }}>

          {(collaborators && collaborators.length > 0) ? (
            <RoleList items={collaborators} title="Team" style={{
              gridColumn: [1, 1, 2],
              minWidth: "200px",
              textAlign: ["center", "center", "right"],
              ...statStyle

            }} />
          ) : <Box sx={{
            gridColumn: [1, 1, 2],
            minWidth: "200px",
          }}></Box>}
          {uniqueAccolades && uniqueAccolades.length > 0 && (
            <Box sx={{
              textAlign: ["center", "center", "left"],
              mx: ["auto", "auto", 0],
              borderLeft: "1px solid red",
              borderWidth: [0, 0, 1],
              borderColor: "secondary",
              paddingLeft: [0, 0, 3],
            }}>
              <Themed.h3 sx={{
                color: lighten('secondary', .1),
                fontWeight: 100,
              }}>Exhibitions</Themed.h3>
              <Box as="ul" sx={{
                mx: 0,
                px: 0,
                listStylePosition: ["outside"],
                listStyle: ["none", "none", "unset"],
                ml: ["1rem"],
              }}>
                {uniqueAccolades.map((accolade) => {
                  let label = "";
                  label += `${accolade.date.split("-")[0]}: `;
                  label += accolade.title;
                  label += accolade.event ? `,\n${accolade.event} ` : " ";
                  return (
                    <Box as="li" key={accolade._id} sx={{
                      mb: [3]
                    }}>
                      <Text
                        sx={{
                          whiteSpace: "pre-wrap",
                        }}
                        fontWeight="bolder"
                        fontSize={[2, 1, 2]}
                      >{`${label}`}</Text>
                      <Text fontSize={[2, 1, 2]} sx={{
                        color: lighten('primary', .1),
                        m: 0,
                        display: "block"
                      }}>
                        {accolade.address}
                      </Text>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Grid>)}

        {filteredProjects && filteredProjects.length > 0 && (
          <Box
            sx={{
              borderTop: "1px solid",
              borderColor: "muted",
              mt: 4,
              textAlign: "center",
            }}
          >
            <Themed.h3 sx={{
              color: lighten('secondary', .1)
            }}>Related Projects</Themed.h3>
            {categories && categories.length > 0 && categoriesButtons}
            <ProjectPreviewGrid nodes={filteredProjects} />
          </Box>
        )}
      </Container>
    </Container>
  );
}

export default Project;
