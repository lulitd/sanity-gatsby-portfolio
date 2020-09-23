import React from "react";
import HamburgerIcon from "./hamburger";
import LogoIcon from "./logo";
import { FaFacebookF , FaExternalLinkAlt,FaLinkedinIn} from 'react-icons/fa';
import { AiOutlineTwitter,AiFillInstagram,AiFillGithub } from "react-icons/ai";

function Icon(props) {
  switch (props.symbol) {
    case "hamburger":
      return <HamburgerIcon {...props}/>;
    case "logo":
      return <LogoIcon {...props} />;
    case "facebook":
      return <FaFacebookF  {...props}/>;

    case "twitter":
      return <AiOutlineTwitter {...props} />;
    case "instagram":
      return <AiFillInstagram  {...props}/>;
    case "github":
      return <AiFillGithub {...props}/>;
    case "linkedin":
      return <FaLinkedinIn {...props} />;
    default:
      return <FaExternalLinkAlt {...props}/>;
  }
}

export default Icon;
