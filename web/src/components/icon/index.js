import React from "react";
import HamburgerIcon from "./hamburger";
import LogoIcon from "./logo";
import { FaFacebookF , FaExternalLinkAlt,FaLinkedinIn} from 'react-icons/fa';
import { AiOutlineTwitter,AiFillInstagram,AiFillGithub } from "react-icons/ai";

function Icon(props) {
  switch (props.symbol) {
    case "hamburger":
      return <HamburgerIcon />;
    case "logo":
      return <LogoIcon />;
    case "facebook":
      return <FaFacebookF />;

    case "twitter":
      return <AiOutlineTwitter />;
    case "instagram":
      return <AiFillInstagram />;
    case "github":
      return <AiFillGithub />;
    case "linkedin":
      return <FaLinkedinIn />;
    default:
      return <FaExternalLinkAlt />;
  }
}

export default Icon;
