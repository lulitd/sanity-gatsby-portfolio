import React from 'react';
import BlockLink from  './transition/blockTransition'
import {jsx} from 'theme-ui';
// @jsx jsx
import { useThemeUI } from 'theme-ui'
const ThemedLink =({to,children,variant,sx,transitionColor,...rest})=>{
const context = useThemeUI()
const { colors } = context.theme;

return (<BlockLink to={to} {...rest}  hex={transitionColor?transitionColor:colors.secondary}
sx={{ variant: `buttons.${variant}`,
...sx
}}
>{children}</BlockLink>)
};

export default ThemedLink; 