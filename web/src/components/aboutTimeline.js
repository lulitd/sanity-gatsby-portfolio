import React from "react";
import { Box, Flex, Heading, Text } from "theme-ui";
import { Link } from "gatsby";
import { alpha } from "@theme-ui/color";

const AboutTimeline = ({ milestones = [] }) => {
  if (!milestones.length) return null;

  return (
    <Box
      as="section"
      aria-labelledby="timeline-heading"
      sx={{
        py: [3, 4, 5],
      }}
    >
      {/* Timeline */}
      <Box
        as="ol"
        sx={{
          listStyle: "none",
          p: 0,
          m: 0,
          maxWidth: "1000px",
        }}
      >
        {milestones.map((milestone, index) => {
          const year = milestone.year;
          const dateTitle = milestone.dateTitle?.trim();

          const previousYear = milestones[index - 1]?.year;
          const showYear = index === 0 || year !== previousYear;

          const dateLabel = dateTitle || (showYear ? String(year ?? "—") : null);
          const isLast = index === milestones.length - 1;

          return (
            <Box
              as="li"
              key={milestone._id}
              sx={{
                display: "grid",
                gridTemplateColumns: [
                  "75px 18px minmax(0, 1fr)",
                  "105px 20px minmax(0, 1fr)",
                  "120px 24px minmax(0, 1fr)",
                ],
                columnGap: [2, 3, 4],
                alignItems: "stretch",
              }}
            >
              {/* Year */}
              <Box
                sx={{
                  pt: 1,
                  color: "primary",
                  fontFamily: "monospace",
                  fontSize: [2, 3, 4],
                  fontWeight: "bold",
                  lineHeight: 1.2,
                  overflowWrap: "break-word",
                  textAlign: "right",
                }}
              >
                {dateTitle ? (
                  <Text as="span">{dateTitle}</Text>
                ) : showYear ? (
                  <Text as="time" dateTime={String(year)}>
                    {year}
                  </Text>
                ) : null}
              </Box>

              {/* Timeline track */}
              <Flex
                sx={{
                  alignItems: "center",
                  flexDirection: "column",
                  pt: 2,
                }}
              >
                <Box
                  sx={{
                    width: "14px",
                    height: "14px",
                    border: "1px solid",
                    borderColor: "secondary",
                    borderRadius: "50%",
                    bg: "background",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                    "::after": {
                      content: '""',
                      position: "absolute",
                      inset: "3px",
                      borderRadius: "50%",
                      bg: "primary",
                    },
                  }}
                />

                {!isLast && (
                  <Box
                    sx={{
                      width: "1px",
                      flex: 1,
                      minHeight: "40px",
                      bg: alpha("secondary", 0.4),
                    }}
                  />
                )}
              </Flex>

              {/* Milestone content */}
              <Box
                sx={{
                  pb: isLast ? 0 : [4, 5],
                  minWidth: 0,
                }}
              >
                {milestone.category && (
                  <Text
                    sx={{
                      display: "block",
                      color: "secondary",
                      fontSize: 0,
                      fontFamily: "monospace",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      mb: 1,
                    }}
                  >
                    {milestone.category}
                  </Text>
                )}

                <Heading
                  as="h3"
                  sx={{
                    fontSize: [2, 3, 4],
                    color: "primary",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: "-0.025em",
                    mb: 2,
                  }}
                >
                  {milestone.title}
                </Heading>

                {milestone.description && (
                  <Text
                    as="p"
                    sx={{
                      maxWidth: "60ch",
                      color: "muted",
                      lineHeight: 1.65,
                      mb: 3,
                    }}
                  >
                    {milestone.description}
                  </Text>
                )}

                {/* Related projects */}
                {milestone.projects?.length > 0 && (
                  <Flex
                    sx={{
                      gap: 3,
                      flexWrap: "wrap",
                      mt: 1,
                    }}
                  >
                    {milestone.projects
                      .filter((project) => project?.slug?.current)
                      .map((project) => (
                        <Link
                          key={project._id}
                          to={`/project/${project.slug.current}/`}
                          sx={{
                            color: "secondary",
                            fontFamily: "monospace",
                            fontSize: 1,
                            textDecoration: "none",
                            borderBottom: "1px solid",
                            borderColor: "secondary",
                            pb: 1,
                            "&:hover": {
                              color: "primary",
                              borderColor: "primary",
                            },
                          }}
                        >
                          {project.title} ↗
                        </Link>
                      ))}
                  </Flex>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default AboutTimeline;
