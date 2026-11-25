import React from "react";
import HamburgerIcon from "./hamburger";
import LogoIcon from "./logo";
import { FaFacebookF, FaLinkedinIn, FaPlay, FaPause } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { PiFilmStripBold } from "react-icons/pi";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillGithub,
  AiOutlineYoutube,
  AiFillStepForward,
  AiFillStepBackward,
  AiOutlineFullscreen,
  AiOutlinePicture,
} from "react-icons/ai";
import { CgMenuGridR, CgClose } from "react-icons/cg";
import { RiUserHeartLine } from "react-icons/ri";
import { VscTools, VscCloseCompact } from "react-icons/vsc";
import { MdImportantDevices } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";

function Icon(props) {
  switch (props.symbol) {
    case "hamburger":
      return <CgMenuGridR {...props} />;
    case "close":
      return <CgClose {...props} />;
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
    case "play":
      return <FaPlay {...props} />;
    case "pause":
      return <FaPause {...props} />;
    case "forward":
      return <AiFillStepForward {...props} />;
    case "backward":
      return <AiFillStepBackward {...props} />;
    case "fullscreen":
      return <AiOutlineFullscreen {...props} />;
    case "video":
      return <PiFilmStripBold {...props} />;
    case "picture":
      return <AiOutlinePicture {...props} />;
    default:
      return <FiExternalLink {...props} />;
  }
}

export default Icon;
