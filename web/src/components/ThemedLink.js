import React from "react";
import {Link} from "gatsby";

import { useThemeUI } from "theme-ui";

const ThemedLink = ({ to, children, variant, sx,...rest }) => {
  const context = useThemeUI();
  const { colors } = context.theme;

  return (
    <Link
    to={to}
    {...rest}
    sx={{ variant: `buttons.${variant}`, ...sx }}>
    {children}
    </Link>
  );
};

export default ThemedLink;
