import React from "react";
import Transition from "./transition";
import { jsx } from "theme-ui";
// @jsx jsx
import { useThemeUI } from "theme-ui";

const ThemedLink = ({ to, children, variant, sx, transitionColor, ...rest }) => {
  const context = useThemeUI();
  const { colors } = context.theme;

  return (
    <Transition
      to={to}
      {...rest}
      bg={transitionColor ? transitionColor : colors.secondary}
      hex={transitionColor ? transitionColor : colors.secondary}
      sx={{ variant: `buttons.${variant}`, ...sx }}
    >
      {children}
    </Transition>
  );
};

export default ThemedLink;
