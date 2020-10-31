
import React from "react";
import SocialsFromBio from "./socials-from-bio";
import { Flex,Text } from 'rebass';
import {jsx} from 'theme-ui';
import Container from "./container"
//import AniLink from "gatsby-plugin-transition-link/AniLink"
import BlockLink from  './transition/blockTransition'
// @jsx jsx
import { useThemeUI } from 'theme-ui'

const CleanLink=({to,children})=>{
  const context = useThemeUI()
  const { colors } = context.theme;
  return (<BlockLink  hex={colors.secondary} to={to} sx={{
    color: 'muted',
    textDecoration: 'none',
    '&:hover': {
      color: 'secondary',
      textDecoration: 'underline'
    },
  }}>{children}</BlockLink>);
};

const Footer = ({ author }) => (
  <Flex as='footer' sx={{alignItems: 'center',width:'100%' }}>
    <Container sx={{borderTop:'1px solid currentColor'}}>
      <Text py={2}>
        Designed & Built by <CleanLink to="/">{author.name}</CleanLink>
      </Text>
      <SocialsFromBio bio={author} />
    </Container>
  </Flex>
);

export default Footer;
