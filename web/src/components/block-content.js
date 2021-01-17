import BaseBlockContent from "@sanity/block-content-to-react";
import React from "react";
import clientConfig from "../../client-config";
import serializers from "./serializers";
import { Box, jsx } from "theme-ui";


// @jsx jsx
const BlockContent =({blocks,style})=> {


  return(
  <Box sx={style}>
  <BaseBlockContent blocks={blocks} serializers={serializers} {...clientConfig.sanity}/>
  </Box>)
  }

export default BlockContent;
