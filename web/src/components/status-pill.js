import React from "react";
import Icon from "./icon";
import { Button, Box, Text, Flex, Image, Heading } from "theme-ui";
import { darken, alpha, lighten } from "@theme-ui/color";
import { keyframes } from "@emotion/react";

function StatusPill({ message, currentStatus, ...rest }) {
  const notifSize = "0.75rem";
  return (
    <Box
      data-status={currentStatus ?? "chat"}
      sx={theme => ({
        "--pill-status-color": "grey",
        position: "relative",
        display: "inline-block",
        border: `1px solid grey`,
        borderColor: "var(--pill-status-color,grey)",
        color: "var(--pill-status-color,grey)",
        pr: "1rem",
        py: "0.5rem",
        pl: `calc(${notifSize}*3)`,
        borderRadius: "pill",
        fontSize: 12,
        letterSpacing: "0.25em",
        fontFamily: "btn",
        textTransform: "uppercase",
        fontWeight: 900,
        textDecoration: "line-through",
        "&[data-status='available']": {
          "--pill-status-color": "lime",
          textDecoration: "none"
        },
        "&[data-status='unavailable']": {
          "--pill-status-color": "grey"
        },
        "&[data-status='chat']": {
          "--pill-status-color": theme.colors.primary,
          textDecoration: "none"
        },
        "&::before": {
          content: '""',
          backgroundColor: "var(--pill-status-color,grey)",
          position: "absolute",
          top: `calc(50% - ${notifSize}/2)`,
          left: `calc(${notifSize}*1.5)`,
          width: notifSize,
          height: notifSize,
          borderRadius: "pill"
        }
      })}
    >
      {message}
    </Box>
  );
}

export default StatusPill;
