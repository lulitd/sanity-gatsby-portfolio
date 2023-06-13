import React from "react";
import HamburgerIcon from "./hamburger";
import LogoIcon from "./logo";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillGithub,
  AiOutlineYoutube
} from "react-icons/ai";
import { CgMenuGridR } from "react-icons/cg";
import { RiUserHeartLine } from "react-icons/ri";
import { VscTools } from "react-icons/vsc";
import { MdImportantDevices } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";

function Icon(props) {
  switch (props.symbol) {
    case "hamburger":
      return <CgMenuGridR {...props} />;
    case "logo":
      return <LogoIcon {...props} />;
    case "facebook":
      return <FaFacebookF {...props} />;
    case "twitter":
      return <AiOutlineTwitter {...props} />;
    case "instagram":
      return <AiOutlineInstagram {...props} />;
    case "youtube":
      return <AiOutlineYoutube {...props} />;
    case "github":
      return <AiFillGithub {...props} />;
    case "linkedin":
      return <FaLinkedinIn {...props} />;
    case "ux":
      return <RiUserHeartLine {...props} />;
    case "tools":
      return <VscTools {...props} />;
    case "device":
      return <MdImportantDevices {...props} />;
    case "controller":
      return <IoGameControllerOutline {...props} />;
    default:
      return <FiExternalLink {...props} />;
  }
}

export default Icon;
