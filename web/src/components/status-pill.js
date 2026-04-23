import React from "react";
import Icon from "./icon";
import { Box, Paragraph } from "theme-ui";
import { keyframes } from "@emotion/react";
import Obfuscate from "react-obfuscate";

const blinker = keyframes({
  "0%": { transform: "scale(1)", opacity: "0.75" },
  "50%": { transform: "scale(1.1)", opacity: "1" },
  "100%": { transform: "scale(1)", opacity: "0.75" },
});

function StatusPill({ message, currentStatus, contactInfo, ...rest }) {
  const notifSize = "0.5rem";
  const contactLink = contactInfo && (
    <Obfuscate
      email={contactInfo}
      headers={{
        subject: "Hello",
      }}
    />
  );
  return (
    <Box
      data-status={currentStatus ?? "available"}
      sx={(theme) => ({
        "--pill-status-color": "grey",
        position: "relative",
        display: "inline-block",
        borderLeft: `2px dotted grey`,
        borderRadius: "pill",
        borderColor: "var(--pill-status-color,grey)",
        color: "var(--pill-status-color,grey)",
        pr: "0.75rem",
        py: "0.75rem",
        pl: `calc(${notifSize}*4)`,
        fontSize: 12,
        textTransform: "uppercase",
        fontWeight: 300,
        textDecoration: "line-through",
        lineHeight: "initial",
        "& p": {
          fontFamily: "btn",
          m: 0,
        },
        "& a": {
          color: "var(--pill-status-color,grey)",
          fontWeight: 900,
          textDecoration: "none",
          textTransform: "none",
        },
        "&[data-status='available']": {
          "--pill-status-color": theme.colors.go,
          textDecoration: "none",
        },
        "&[data-status='unavailable']": {
          "--pill-status-color": "grey",
        },
        "&[data-status='unavailable']::before": {
          animationPlayState: "paused",
        },
        "&[data-status='chat']": {
          "--pill-status-color": theme.colors.primary,
          textDecoration: "none",
        },
        "&::before": {
          content: '""',
          backgroundColor: "var(--pill-status-color,grey)",
          position: "absolute",
          top: `calc(50% - ${notifSize}/2)`,
          left: `calc(${notifSize}*1.5)`,
          width: notifSize,
          height: notifSize,
          borderRadius: "pill",
          filter: "blur(2px)",
          animation: `${blinker} 1s infinite cubic-bezier(0, 0, 0.2, 1)`,
        },
      })}
    >
      <Paragraph>Status: {message ?? "Let's Work Together"}</Paragraph>
      {contactLink}
    </Box>
  );
}

export default StatusPill;
