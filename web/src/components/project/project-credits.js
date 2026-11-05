import React from "react";
import { Box, Grid, Flex, Heading, Text, Link } from "theme-ui";
import { alpha, lighten } from "@theme-ui/color";
import Icon from "../icon";

const getPersonUrl = (person) => {
  return (
    person?.website ||
    person?.linkedin ||
    person?.github ||
    person?.instagram ||
    person?.twitter ||
    null
  );
};

function CreditPerson({ member }) {
  const name = member?.person?.name;
  const roles = member?.roles || [];

  const url = name === "Lalaine Ulit-Destajo" ? null : getPersonUrl(member?.person);

  if (!name) return null;

  const content = (
    <>
      <Text
        as="span"
        sx={{
          display: "block",
          fontWeight: "bold",
          fontSize: 1,
          overflowWrap: "anywhere",
        }}
      >
        {name}
        {url && <Icon sx={{ ml: 1 }} />}
      </Text>

      {roles.length > 0 && (
        <Text
          as="span"
          sx={{
            display: "block",
            fontWeight: "normal",
            mt: 1,
            fontSize: 0,
            color: "muted",
            transition: "color 0.2s ease",
          }}
        >
          {roles.join(" · ")}
        </Text>
      )}
    </>
  );

  return (
    <Box sx={{ minWidth: 0 }}>
      {url ? (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "inline-block",
            fontFamily: "body",
            color: "text",
            textDecoration: "none",

            "&:hover, &:focus-visible": {
              color: "secondary",
              outline: "2px solid",
              outlineColor: "secondary",
              outlineOffset: 4,
              textDecoration: "none",
            },

            "&:hover span, &:focus-visible span": {
              color: "secondary",
            },

            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "secondary",
              outlineOffset: 4,
            },
          }}
        >
          {content}
        </Link>
      ) : (
        <Box>{content}</Box>
      )}
    </Box>
  );
}

export default function ProjectCredits({ creditGroups = [], members = [] }) {
  const hasGroups = creditGroups.length > 0;

  const groups = hasGroups
    ? creditGroups
    : members.length > 0
      ? [{ _key: "legacy", title: "The Team", members }]
      : [];

  if (!groups.length) return null;

  return (
    <Box
      as="section"
      aria-labelledby="project-credits-heading"
      sx={{
        py: [4, 5],
        px: [3, 4],
      }}
    >
      <Heading
        as="h2"
        id="project-credits-heading"
        sx={{
          color: "primary500",
          fontSize: [4, 5],
          mb: 4,
        }}
      >
        PROJECT CREDITS
      </Heading>

      {groups.map((group, index) => (
        <Box key={group._key || index} sx={{ mb: 6 }}>
          <Flex
            sx={{
              alignItems: "center",
              gap: 2,
              mb: 4,
              borderBottom: "1px dotted",
              borderColor: alpha("primary", 0.4),
              pb: 2,
            }}
          >
            <Text sx={{ color: "primary500", fontSize: 1, fontFamily: "heading" }}>
              {String(index + 1).padStart(2, "0")} /
            </Text>
            <Heading
              as="h3"
              sx={{
                color: "primary500",
                fontSize: [1, 2, 3],
                mb: 0,
              }}
            >
              {group.title}
            </Heading>
          </Flex>

          <Grid columns={[1, 2, 3]} gap={[3, 3, 5]} px={6}>
            {group.members?.map((member) => (
              <CreditPerson key={member._key} member={member} />
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
