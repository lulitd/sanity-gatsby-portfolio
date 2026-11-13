import React from "react";
import { Box, Flex, Heading, Text } from "theme-ui";

const EditorialHeader = ({
  number,
  label,
  title,
  description,
  descriptionWidth = ["65ch"],
  as = "h2",
  variant = "default",
  sx = {},
}) => {
  if (!title && !label && !description) return null;

  const isHero = variant === "hero";

  return (
    <Box
      className="editorial-header"
      sx={{
        width: "100%",
        minWidth: 0,
        mb: isHero ? 5 : 6,
        ...sx,
      }}
    >
      {/* Number / Section Label */}
      {(number || label) && (
        <Flex
          sx={{
            alignItems: "center",
            gap: 3,
            mb: 3,
          }}
        >
          <Text
            as={as}
            sx={{
              fontFamily: "monospace",
              fontSize: 1,
              fontWeight: "normal",
              letterSpacing: "0.12em",
              color: "secondary",
              whiteSpace: "nowrap",
            }}
          >
            {[number, label].filter(Boolean).join(" / ")}
          </Text>

          <Box
            aria-hidden="true"
            sx={{
              flex: 1,
              height: "1px",
              bg: "primary",
              opacity: 0.5,
            }}
          />
        </Flex>
      )}

      {/* Heading */}
      {title && (
        <Heading
          as={as}
          sx={{
            fontFamily: "heading",
            fontSize: isHero ? [4, 5, 6] : [3, 4, 5],
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            mb: description ? 4 : 0,
            overflowWrap: "break-word",
          }}
        >
          {title}
        </Heading>
      )}

      {/* Optional description */}
      {description && (
        <Text
          as="p"
          sx={{
            maxWidth: descriptionWidth,
            whiteSpace: "pre-line",
            textWrap: "pretty",
            color: "muted",
            lineHeight: 1.65,
            mb: 0,
          }}
        >
          {description}
        </Text>
      )}
    </Box>
  );
};

export default EditorialHeader;
