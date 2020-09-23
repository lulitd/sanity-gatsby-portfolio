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
//@jsx jsx

function PostPreview(props) {
    const hasBG = props.mainImage && props.mainImage.asset;
    let bgURL;

    if (hasBG) {
        bgURL = imageUrlFor(buildImageObj(props.mainImage))
            .width(350)
            .height(350)
            .fit("fill")
            .url();
    }

    return (
        <Link to={`/post/${props.slug.current}`}
            sx={{
                textDecoration: 'none',
            }} >
            <Card my={2}
                sx={
                    {
                        borderRadius: 'default',
                        borderWidth: 2,
                        borderStyle: 'solid',
                        color: 'primary',
                        fontFamily: 'heading',
                        letterSpacing: '0.25rem',
                        borderColor: 'inherit',
                        minHeight:'250px',
                        display: 'flex',
                        opacity: '0.8',
                        transition: '0.5s',
                        height:'100%',
                        ":hover": {
                            color: "background",
                            borderRadius: 'default',
                            borderWidth: 2,
                            borderStyle: 'solid',
                            borderColor: 'secondary',
                            opacity: '1',
                            '& h2,h3': {
                                color: 'secondary',
                                textDecoration:'underline'
                            },
                        }
                    }
                }
            >
                <Grid
                    gap={0}
                    columns={[2, '1fr 2fr']}
                    sx={{
                        height:'100%'
                    }}
                    >
                    <Image src={bgURL}  sx={{
                        width:'350px',
                        height:'100%',
                        width:'100%',
                        objectFit:'cover'
                        }}/>

                    <Flex p={3} sx={{
                        backgroundColor: 'red',
                        flexDirection:'column',
                        height:'100%',
                        gridColumn: '1 / -1'
                    }}>
                        <Heading sx={{
                            color: lighten('primary', 0.1),
                            textTransform: 'uppercase',
                        }} fontSize={[4, 5]}>{props.title}</Heading>
                        {props.subtitle && (
                            <Styled.p sx={{
                                color: 'muted',
                                letterSpacing: 'normal',
                                flex:'1 1 auto'
                            }} >{props.subtitle}</Styled.p>
                        )}
                        <Styled.p sx={{color:'primary'}}>Read More...</Styled.p>
                    </Flex>
                </Grid>


            </Card>

        </Link>
    )
}

export default PostPreview
