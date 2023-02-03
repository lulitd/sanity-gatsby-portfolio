import React from "react";
import Transition from "./transition";
import { jsx } from "theme-ui";
import {Link} from "gatsby";
// @jsx jsx
import { useThemeUI } from "theme-ui";

const ThemedLink = ({ to, children, variant, sx, transitionColor, ...rest }) => {
  const context = useThemeUI();
  const { colors } = context.theme;

  return (
    // <Transition
    //   to={to}
    //   {...rest}
    //   bg={transitionColor ? transitionColor : colors.primary}
    //   hex={transitionColor ? transitionColor : colors.primary}
    //   sx={{ variant: `buttons.${variant}`, ...sx }}
    //   entry={{
    //     state: {
    //     showNav: false
    //     }
    //   }}
    // >
    //<>
    //  {children}
    //</>
    // </Transition>

    <Link
    to={to}
    {...rest}
    sx={{ variant: `buttons.${variant}`, ...sx }}>
    {children}
    </Link>
  );
};

export default ThemedLink;
