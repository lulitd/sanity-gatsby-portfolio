import { Link } from 'gatsby'
import React from 'react'
import { cn, buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-text'
import { Styled, Grid, jsx, Card, Image } from "theme-ui"
import { lighten, alpha } from "@theme-ui/color"

import { Heading, Box, Flex } from "rebass";
import {compose, filter} from 'ramda';
import { FaRegIdBadge } from 'react-icons/fa'

import ThemedLink from './ThemedLink';

import { useThemeUI } from 'theme-ui'
//@jsx jsx

function PostPreview(props) {
    const hasBG = props.mainImage && props.mainImage.asset;
    let bgURL;

    if (hasBG) {
        bgURL = imageUrlFor(buildImageObj(props.mainImage))
            .width(250)
            .height(250)
            .fit("fill")
            .url();
    }
    const context = useThemeUI()
    const { colors } = context.theme;
    return (
        <ThemedLink to={`/post/${props.slug.current}`}
            transitionColor={colors.primary}
            sx={{
                textDecoration: 'none',
            }} >
            <Card my={2}
                sx={
                    {
                        borderRadius:0,
                        borderTopRightRadius:'default',
                        borderBottomLeftRadius:'default',
                        borderWidth: 2,
                        borderStyle: 'solid',
                        color: 'primary',
                        fontFamily: 'heading',
                        letterSpacing: '0.25rem',
                        borderColor: 'inherit',
                        minHeight:'[250px]',
                        display: 'flex',
                        transition: '0.5s',
                        height:'100%',
                        overflow:"hidden",
                        background: alpha('muted', 0.1),
                        ":hover": {
                            color: "background",
                            borderColor: 'secondary',
                            borderRadius:'default',
                            borderTopRightRadius:'0',
                            borderBottomLeftRadius:'0',
                            background: alpha('darkest', 1),
                            '& h2,h3': {
                                color: 'secondary'
                            },
                            '& p': {
                                color: lighten('secondary', 0.4),
                            },
                            '& p:last-of-type ': {
                                color: lighten('secondary', 0.1),
                                opacity:0.8,
                            },
                        }
                    }
                }
            >
                <Grid
                gap={0}
                columns={'1fr 2fr'}
                sx={{
                flex:1, 
                }}
                >

                    <Image src={bgURL}  sx={{
                        width:'250px',
                        height:'100%',
                        width:'100%',
                        objectFit:'cover',
                    }}/>

                    <Flex p={3} sx={{
                        flexDirection:'column',
                        height:'100%',
                    }}>
                        <Heading sx={{
                            color: lighten('primary', 0.1),
                            textTransform: 'uppercase',
                        }} fontSize={[4, 5]}>{props.title}</Heading>
                        {props.subtitle && (
                            <Styled.p sx={{
                                color: 'muted',
                                letterSpacing: 'normal',
                                flex:'1 1 auto',
                            }} >{props.subtitle}</Styled.p>
                        )}
                        <Styled.p sx={{color:'primary',opacity:0.7, fontSize:1}}>Read More...</Styled.p>
                    </Flex>
                </Grid>
            </Card>

        </ThemedLink>
    )
}

export default PostPreview
