import { format, distanceInWords, differenceInDays, parseISO } from "date-fns";
import React from "react";
import { buildImageObj } from "../../lib/helpers";
import PortableTextRenderer from "../sanity/portable-text-renderer";
import Container from "../container";
import RoleList from "./role-list";
import SocialsFromBio from "../socials-from-bio";
import ProjectPreviewGrid from "./project-preview-grid";
import ParallaxHero from "../hero/parallaxHero";
import { Grid, Heading, Box, Text, Flex } from "theme-ui";
import ThemedLink from "../atoms/ThemedLink";
import { alpha, lighten } from "@theme-ui/color";
import ProjectSection from "./projectSection";
import ProjectHero from "../hero/project-hero";
import ProjectCredits from "./project-credits";
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
    creditGroups,
    accolades,
    mainImage,
    relatedProjects,
    awards,
    youtube,
    website,
    instagram,
    github,
    twitter,
    heroLayout,
    heroImagePosition,
  } = props;

  const collaborators = members;

  let merged = [...(accolades ?? []), ...(awards ?? [])];

  const allIds = merged.map((el) => el["_id"]);
  const uniqueAccolades = merged.filter((obj, index) => {
    return allIds.indexOf(obj["_id"]) === index;
  }); // removing all duplicates

  uniqueAccolades.sort((a, b) => a.date - b.date).reverse();

  const filteredProjects = (relatedProjects ?? []).filter((item) => {
    return item && item.publishedAt;
  });

  const categoriesButtons = (
    <Box sx={{ flex: 1, textAlign: "center", textWrap: "balance" }}>
      <Box
        as="ul"
        sx={{
          listStyle: "none",
          p: 2,
        }}
      >
        {categories.reduce((acm, cat) => {
          if (cat && cat.title && cat.slug) {
            const el = (
              <Box as="li" sx={{ display: "inline-block", mx: [2], my: [4] }} key={`li_${cat._id}`}>
                <ThemedLink to={`/projects/category/${cat.slug.current}`} variant="outlineBtn">
                  #{cat.title}
                </ThemedLink>
              </Box>
            );
            acm.push(el);
          }
          return acm;
        }, [])}
      </Box>
    </Box>
  );

  const rolesSection = (
    <Box
      sx={{
        textAlign: "center",
        justifyItems: "center",
        flex: 1,
        py: 4,
      }}
    >
      <Heading as="h3" variant="contentSubHeading">
        Roles & Contributions
      </Heading>
      <Box
        as="ul"
        sx={{
          mx: 0,
          px: 0,
          listStyle: "none",
          maxWidth: "50ch",
          textWrap: "balance",
        }}
      >
        {roles.map((role) => {
          return (
            <Box as="li" key={role._id}>
              <Text
                sx={{
                  whiteSpace: "pre-wrap",
                  letterSpacing: "2px",
                  fontWeight: "800",
                  fontFamily: "body",
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
                  fontFamily: "heading",
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
        justifyItems: "center",
        py: 4,
      }}
    >
      <Heading as="h3" variant="contentSubHeading">
        Technologies
      </Heading>

      <Box
        as="ul"
        sx={{
          mx: 0,
          px: 0,
          listStyle: "none",
          maxWidth: "50ch",
          textWrap: "balance",
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
                  fontWeight: "800",
                  fontFamily: "body",
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
                  fontFamily: "heading",
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
        justifyContent: "flex-start",
        pt: 3,
      }}
    />
  );

  const metadataCount = [
    categories?.length > 0,
    roles?.length > 0,
    technologies?.length > 0,
  ].filter(Boolean).length;

  return (
    <Container as="article" sx={{ p: [0, 0, 0] }}>
      {/* Title and Image */}
      <ProjectHero
        title={title}
        subtitle={subtitle}
        mainImage={mainImage}
        categories={categories}
        socialIcons={socialIcons}
        heroLayout={heroLayout}
        heroImagePosition={heroImagePosition}
      />

      <Container
        sx={{
          mx: "auto",
          px: [3, 4],
          " > div": {
            mb: 8,
          },
        }}
      >
        {metadataCount > 0 && (
          <Grid
            gap={[2, 3, 4]}
            columns={[1, null, metadataCount]}
            sx={{
              alignItems: "start",
              py: [4, 5],
              borderBottom: "1px solid",
              borderColor: alpha("primary", 0.4),
            }}
          >
            {categories && categories.length > 0 && categoriesButtons}
            {roles && roles.length > 0 && rolesSection}
            {technologies && technologies.length > 0 && techSection}
          </Grid>
        )}

        {_rawProjectBrief && (
          <ProjectSection title="Project Description">
            <PortableTextRenderer value={_rawProjectBrief || []} />
          </ProjectSection>
        )}

        {_rawProjectBreakdown && (
          <ProjectSection title="Project Breakdown">
            <PortableTextRenderer value={_rawProjectBreakdown || []} />
          </ProjectSection>
        )}

        {uniqueAccolades && uniqueAccolades.length > 0 && (
          <Box
            sx={{
              textAlign: ["left"],
              justifyItems: "center",
              width: "fit-content",
              p: 6,
              mx: "auto",
              borderRadius: "default",
              borderBottom: "1px solid",
              borderTop: "1px solid",
              borderColor: alpha("primary", 0.4),
            }}
          >
            <Heading as="h3" variant="contentSubHeading">
              Exhibitions
            </Heading>
            <Box
              as="ul"
              sx={{
                "--bullet--size": "18px",
                m: 0,
                p: 0,
                ml: 2,
                listStyle: "none",
                position: "relative",
                "::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: 2,
                  backgroundImage: (t) => `
                                   linear-gradient(
                                     to bottom,
                                     ${alpha("secondary", 0.75)(t)},
                                     ${alpha("secondary", 0.1)(t)}
                                   )
                                 `,
                },
                "li:not(last-child)": {
                  mb: 5,
                },
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
                      position: "relative",
                      pl: 4,
                      textWrap: "balance",
                      maxWidth: "60ch",
                      "::before": {
                        content: '"\\25B2"',
                        position: "absolute",
                        left: `calc(var(--bullet--size,"12px")*-0.5)`,
                        top: `calc(var(--bullet--size,"12px")*-0.5)`,
                        fontSize: `var(--bullet--size,"12px")`,
                        color: "secondary",
                        zIndex: "1",
                      },
                    }}
                  >
                    <Text
                      sx={{
                        whiteSpace: "pre-wrap",
                        fontWeight: "400",
                        fontFamily: "heading",
                      }}
                      fontSize={[2, 1, 2]}
                    >{`${label}`}</Text>
                    <Text
                      fontSize={[2, 1, 2]}
                      sx={{
                        color: lighten("primary", 0.1),
                        m: 0,
                        display: "block",
                        fontFamily: "body",
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

        <ProjectCredits creditGroups={creditGroups || []} members={collaborators || []} />

        {filteredProjects && filteredProjects.length > 0 && (
          <Box
            sx={{
              mt: [4, 6, 8],
              pt: [6],
              textAlign: "center",
            }}
          >
            <Heading
              as="h3"
              sx={{
                color: "primary",
                fontSize: [8],
              }}
            >
              Related Projects
            </Heading>
            {categories && categories.length > 0 && <Box pb={4}>{categoriesButtons}</Box>}
            <ProjectPreviewGrid nodes={filteredProjects} variant="related" />
          </Box>
        )}
      </Container>
    </Container>
  );
}

export default Project;
