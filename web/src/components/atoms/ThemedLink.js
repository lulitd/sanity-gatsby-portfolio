import React from "react";
import { Link } from "gatsby";

import { useThemeUI } from "theme-ui";

const ThemedLink = ({ to, children, variant, sx, ...rest }) => {
  return (
    <Link to={to} {...rest} sx={{ variant: `buttons.${variant}`, ...sx }}>
      {children}
    </Link>
  );
};

export default ThemedLink;
