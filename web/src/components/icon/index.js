import React from "react";
import HamburgerIcon from "./hamburger";
import LogoIcon from "./logo";
import { FaFacebookF,FaLinkedinIn } from 'react-icons/fa';
import { FiExternalLink} from 'react-icons/fi';
import { AiOutlineTwitter,AiOutlineInstagram,AiFillGithub,AiOutlineYoutube } from "react-icons/ai";

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
      return <AiOutlineInstagram  {...props}/>;
    case "youtube":
      return <AiOutlineYoutube  {...props}/>;
    case "github":
      return <AiFillGithub {...props}/>;
    case "linkedin":
      return <FaLinkedinIn {...props} />;
    default:
      return <FiExternalLink {...props}/>;
  }
}

export default Icon;
