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
import { Themed } from "@theme-ui/mdx";
import ThemedLink from "./ThemedLink";
import { darken, alpha, lighten } from "@theme-ui/color";
import { FaAutoprefixer } from "react-icons/fa";

function Project(props) {
  const {
    _rawProjectBrief,
    _rawProjectBreakdown,
    title,
    subtitle,
    categories,
    roles,
    technologies,
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
  const categoriesButtons = (
    <Box pb={2} sx={{ flex: 1, textAlign: "center" }}>
      <ul
        sx={{
          listStyle: "none",
          padding: 0,
        }}
      >
        {categories.reduce((acm, cat) => {
          if (cat && cat.title && cat.slug) {
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
    </Box>
  );

  const rolesSection = (
    <Box
      sx={{
        textAlign: "center",
        flex: 1,
      }}
    >
      <Themed.h3
        sx={{
          color: lighten("secondary", 0.1),
          fontSize: [4],
        }}
      >
        Roles & Contributions
      </Themed.h3>
      <Box
        as="ul"
        sx={{
          mx: 0,
          px: 0,
          listStyle: "none",
        }}
      >
        {roles.map((role) => {
          return (
            <Box as="li" key={role._id}>
              <Text
                sx={{
                  whiteSpace: "pre-wrap",
                  letterSpacing: "2px",
                  fontWeight: "900",
                }}
                fontSize={[2, 1, 2]}
              >
                {role.fieldTitle}
              </Text>
              <Text
                fontSize={[2, 1, 2]}
                sx={{
                  color: lighten("primary", 0.1),
                  m: 0,
                  display: "block",
                }}
              >
                {role.fieldInfo}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );

  const techSection = (
    <Box
      sx={{
        flex: 1,
        textAlign: "center",
      }}
    >
      <Themed.h3
        sx={{
          color: lighten("secondary", 0.1),
          fontSize: [4],
        }}
      >
        Technologies
      </Themed.h3>
      <Box
        as="ul"
        sx={{
          mx: 0,
          px: 0,
          listStyle: "none",
        }}
      >
        {technologies.map((tech) => {
          return (
            <Box
              as="li"
              key={tech._id}
              sx={{
                mb: [2],
              }}
            >
              <Text
                sx={{
                  whiteSpace: "pre-wrap",
                  letterSpacing: "2px",
                  fontWeight: "900",
                }}
                fontSize={[2, 1, 2]}
              >
                {tech.fieldTitle}
              </Text>
              <Text
                fontSize={[2, 1, 2]}
                sx={{
                  color: lighten("primary", 0.1),
                  m: 0,
                  display: "block",
                }}
              >
                {tech.fieldInfo}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );

  const socialIcons = (
    <SocialsFromBio
      bio={props}
      iconStyle={{ m: [1] }}
      sx={{
        display: "flex",
        placeContent: "center",
        pt: 3,
      }}
    />
  );

  const bgUrl =
    props.mainImage &&
    mainImage.asset &&
    imageUrlFor(buildImageObj(mainImage)).width(1024).blur(3).url();

  const imageHotspot = props.mainImage && mainImage.hotspot;

  return (
    <Container as="article" sx={{ p: [0, 0, 0] }}>
      {/* Title and Image */}
      <Grid
        sx={{
          minHeight: "100px",
          textAlign: "center",
          height: ["75vh"],
          gridTemplateColumns: ["1fr 6fr 1fr", "1fr 4fr 1fr", "1fr 2fr 1fr", "1fr 3fr 1fr"],
          gridTemplateRows: ["1fr 2fr 1fr", "1fr 2fr 1fr", "1fr 2fr 1fr", "1fr 3fr 1fr"],
          background: [
            bgUrl
              ? `url(${bgUrl})`
              : (t) => `
          linear-gradient(
          to bottom,
          ${alpha("background", 1)(t)},
          ${alpha("background", 1)(t)},
          ${alpha("primary", 0.5)(t)}
        )`,
          ],
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPositionY: `${(imageHotspot ? imageHotspot.y : 0.5) * 100}%`,
          backgroundPositionX: `${(imageHotspot ? imageHotspot.x : 0.5) * 100}%`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            gridArea: "2/2",
            display: "grid",
            placeContent: "center",
            padding: [2, 3, 4],
            borderWidth: [2, null, 3],
            borderStyle: "solid",
            borderColor: "primary",
            backgroundColor: alpha("background", 0.5),
            backdropFilter: "blur(2em)",
          }}
        >
          <Heading
            sx={{
              color: "primary",
              textTransform: "uppercase",
              fontSize: [5, 6],
            }}
          >
            {title}
          </Heading>
          <Heading
            variant="subheading"
            sx={{
              fontFamily: "body",
              fontSize: [3, 4],
            }}
          >
            {subtitle}
          </Heading>
          {socialIcons}
        </Box>
      </Grid>

      <Container sx={{ mx: "auto", px: [3, 4] }}>
        <Flex sx={{ flexDirection: ["column", "column", "row"], mb: 5 }}>
          {categories && categories.length > 0 && categoriesButtons}
          {roles && roles.length > 0 && rolesSection}
          {technologies && technologies.length > 0 && techSection}
        </Flex>
        {_rawProjectBrief && (
          <Grid
            columns={[1, 1, "2fr 3fr"]}
            gap={[1, 2, 3]}
            sx={{
              mb: 5,
              alignItems: "start",
            }}
          >
            <Themed.h3
              sx={{
                color: "secondary",
                textAlign: ["center", "center", "right"],
                minWidth: "200px",
                gridColumn: [1],
                fontSize: [6],
                position: ["initial", "initial", "sticky"],
                top: "8rem",
                marginTop: "1rem",
              }}
            >
              Project Description
            </Themed.h3>
            <BlockContent
              style={{
                mx: ["auto", "auto", 0],
                borderLeft: "1px solid red",
                borderWidth: [0, 0, 1],
                borderColor: "secondary",
                paddingLeft: [0, 0, 3],
              }}
              blocks={_rawProjectBrief || []}
            />
          </Grid>
        )}

        {_rawProjectBreakdown && (
          <Grid
            columns={[1, 1, "2fr 3fr"]}
            gap={[1, 2, 3]}
            sx={{
              my: 5,
              alignItems: "start",
            }}
          >
            <Themed.h3
              sx={{
                color: "secondary",
                textAlign: ["center", "center", "right"],
                minWidth: "200px",
                gridColumn: [1],
                fontSize: [6],
                position: ["initial", "initial", "sticky"],
                top: "8rem",
                marginTop: "1rem",
              }}
            >
              Project Breakdown
            </Themed.h3>
            <BlockContent
              style={{
                mx: ["auto", "auto", 0],
                borderLeft: "1px solid red",
                borderWidth: [0, 0, 1],
                borderColor: "secondary",
                paddingLeft: [0, 0, 3],
              }}
              blocks={_rawProjectBreakdown || []}
            />
          </Grid>
        )}
        {stats > 0 && (
          <Grid
            columns={[1, 1, "2fr 3fr"]}
            gap={[1, 2, 3]}
            sx={{
              my: 5,
            }}
          >
            {collaborators && collaborators.length > 0 ? (
              <RoleList
                items={collaborators}
                title="Team"
                style={{
                  position: "relative",
                  isolation: "isolate",
                  gridColumn: [1],
                  minWidth: "200px",
                  textAlign: ["center", "center", "right"],
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRight: "1px solid red",
                    borderWidth: [0, 0, stats > 1 ? 0 : 1],
                    borderColor: "secondary",
                    right: "-1rem",
                    zIndex: -1,
                  },
                }}
              />
            ) : (
              <Box
                sx={{
                  gridColumn: [1, 1, 2],
                  minWidth: "200px",
                  isolation: "isolate",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRight: "1px solid red",
                    borderWidth: [0, 0, stats > 0 ? 0 : 1],
                    borderColor: "secondary",
                    right: "-1rem",
                    zIndex: -1,
                  },
                }}
              ></Box>
            )}
            {uniqueAccolades && uniqueAccolades.length > 0 && (
              <Box
                sx={{
                  textAlign: ["center", "center", "left"],
                  mx: ["auto", "auto", 0],
                  borderLeft: "1px solid red",
                  borderWidth: [0, 0, 1],
                  borderColor: "secondary",
                  paddingLeft: [0, 0, 3],
                }}
              >
                <Themed.h3
                  sx={{
                    color: lighten("secondary", 0.1),
                    fontSize: [6],
                  }}
                >
                  Exhibitions
                </Themed.h3>
                <Box
                  as="ul"
                  sx={{
                    mx: 0,
                    px: 0,
                    listStylePosition: ["outside"],
                    listStyle: ["none", "none", "unset"],
                    ml: ["1rem"],
                  }}
                >
                  {uniqueAccolades.map((accolade) => {
                    let label = "";
                    label += `${accolade.date.split("-")[0]}: `;
                    label += accolade.title;
                    label += accolade.event ? `,\n${accolade.event} ` : " ";
                    return (
                      <Box
                        as="li"
                        key={accolade._id}
                        sx={{
                          mb: [3],
                        }}
                      >
                        <Text
                          sx={{
                            whiteSpace: "pre-wrap",
                            letterSpacing: "2px",
                            fontWeight: "900",
                          }}
                          fontSize={[2, 1, 2]}
                        >{`${label}`}</Text>
                        <Text
                          fontSize={[2, 1, 2]}
                          sx={{
                            color: lighten("primary", 0.1),
                            m: 0,
                            display: "block",
                          }}
                        >
                          {accolade.address}
                        </Text>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Grid>
        )}

        {filteredProjects && filteredProjects.length > 0 && (
          <Box
            sx={{
              borderTop: "1px solid",
              borderColor: "muted",
              mt: 4,
              textAlign: "center",
            }}
          >
            <Themed.h3
              sx={{
                color: "primary",
                fontSize: [8],
              }}
            >
              Related Projects
            </Themed.h3>
            {categories && categories.length > 0 && categoriesButtons}
            <ProjectPreviewGrid nodes={filteredProjects} />
          </Box>
        )}
      </Container>
    </Container>
  );
}

export default Project;
