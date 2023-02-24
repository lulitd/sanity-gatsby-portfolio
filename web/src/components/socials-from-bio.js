import React from "react";
import Icon from "./icon";
import { Button,Box,Text} from "theme-ui";


function SocialsFromBio({ bio,withLabels,iconStyle, ...rest }) {
  let socials = [];

  //if (!bio) return null;

  if (bio.twitter) socials.push({ name: "twitter", link: bio.twitter });
  if (bio.instagram) socials.push({ name: "instagram", link: bio.instagram });
  if (bio.linkedin) socials.push({ name: "linkedin", link: bio.linkedin });
  if (bio.github) socials.push({ name: "github", link: bio.github });
  if (bio.website) socials.push({ name: "website", link: bio.website });
  if (bio.youtube) socials.push({ name: "youtube", link: bio.youtube });
  const socialIcons = socials.map((social) => {
    return (
      <Button
        as="a"
        href={social.link}
        key={social.name}
        target="_blank"
        rel="nofollow noopener noreferrer"
        variant="socialBtn"
        aria-label={social.name}
        sx={iconStyle}
      >
        <Icon symbol={social.name} />
        {withLabels?<Text>{social.name}</Text>:null}
      </Button>
    );
  });

  return (
    <Box {...rest} my={2}>
      {socialIcons}
    </Box>
  );
}

export default SocialsFromBio;
