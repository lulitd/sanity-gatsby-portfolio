import React from "react";
import Icon from "./icon";
import {Box,Button} from 'rebass';
import {jsx} from 'theme-ui';

//@jsx jsx

function SocialsFromBio({ bio, ...rest}) {
  let socials = [];

  if (!bio) return null;

  if (bio.twitter) socials.push({ name: "twitter", link: bio.twitter });
  if (bio.instagram) socials.push({ name: "instagram", link: bio.instagram });
  if (bio.linkedin) socials.push({ name: "linkedin", link: bio.linkedin });
  if (bio.github) socials.push({ name: "github", link: bio.github });

  const socialIcons = socials.map(social => {
    return (
      <Button
        as='a'
        href={social.link}
        key={social.name}
        target="_blank"
        rel="nofollow noopener noreferrer"
        variant='socialBtn'
      >
        <Icon symbol={social.name} />
      </Button>
    );
  });

return <Box {...rest} my={2}>{socialIcons}</Box>
}

export default SocialsFromBio;