import React from "react";

const strokeStyle = { vectorEffect: "non-scaling-stroke" };

const LogoIcon = (props) => (
  <svg
    viewBox="0 0 288 288"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    width="2em"
    height="2em"
    {...props}
  >
    <path
      stroke="currentColor"
      fill="currentColor"
      style={strokeStyle}
      d="M144,257H31V36c0-2.8,2.2-5,5-5s5,2.2,5,5v211h103c2.8,0,5,2.2,5,5S146.8,257,144,257z"
    />

    <path
      stroke="currentColor"
      fill="currentColor"
      style={strokeStyle}
      d="M252,257c-2.8,0-5-2.2-5-5V41H144c-2.8,0-5-2.2-5-5s2.2-5,5-5h113v221C257,254.8,254.8,257,252,257z"
    />
    <path
      stroke="currentColor"
      fill="currentColor"
      style={strokeStyle}
      d="M117,177.4c-0.4,0-0.8-0.1-1.2-0.3L58,144l57.8-33c1.2-0.7,2.7-0.3,3.4,0.9c0.7,1.2,0.3,2.7-0.9,3.4L68,144
		l50.2,28.7c1.2,0.7,1.6,2.2,0.9,3.4C118.7,176.9,117.9,177.4,117,177.4z"
    />
    <path
      stroke="currentColor"
      fill="currentColor"
      style={strokeStyle}
      d="M171,177.4c-0.9,0-1.7-0.5-2.2-1.3c-0.7-1.2-0.3-2.7,0.9-3.4L220,144l-50.2-28.7c-1.2-0.7-1.6-2.2-0.9-3.4
			c0.7-1.2,2.2-1.6,3.4-0.9l57.8,33l-57.8,33C171.8,177.3,171.4,177.4,171,177.4z"
    />
  </svg>
);

export default LogoIcon;
