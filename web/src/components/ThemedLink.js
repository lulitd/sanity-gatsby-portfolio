import React from 'react';
import {Link as GatsbyLink} from 'gatsby';
import {Button as RebassLink,Box} from 'rebass';

const ThemedLink =({to,children,variant,...rest})=>(
<RebassLink to={to} {...rest} variant={variant} as={GatsbyLink}>{children}</RebassLink>
);

export default ThemedLink; 