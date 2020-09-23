import { Link } from "gatsby";
import React from "react";
import { cn } from "../lib/helpers";
import SocialsFromBio from "./socials-from-bio";
import { Flex, Box, Button,Text } from 'rebass';
import {jsx} from 'theme-ui';
import Container from "./container"
// @jsx jsx

const CleanLink=({to,children})=>(
  <Link to={to} sx={{
    color: 'muted',
    textDecoration: 'none',
    '&:hover': {
      color: 'secondary',
      textDecoration: 'underline'
    },
  }}>{children}</Link>
);
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
