import React from 'react';
import AniLink from "gatsby-plugin-transition-link/AniLink"
import {jsx} from 'theme-ui';
// @jsx jsx
import { useThemeUI } from 'theme-ui'
const ThemedLink =({to,children,variant,sx,transitionColor,...rest})=>{
const context = useThemeUI()
const { colors } = context.theme;

return (<AniLink to={to} {...rest} paintDrip hex={transitionColor?transitionColor:colors.secondary}
sx={{ variant: `buttons.${variant}`,
...sx
}}
>{children}</AniLink>)
};

export default ThemedLink; 