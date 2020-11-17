import React from "react";
import { Container as UiContainer } from "theme-ui";
import { jsx } from "theme-ui";
/*@jsx jsx*/
const Container = ({ sx, ...props }) => {
  return (
    <UiContainer
      sx={{
        mx: "auto",
        px: [2, 4],
        py: [2],
        ...sx,
      }}
      {...props}
    >
      {props.children}
    </UiContainer>
  );
};

export default Container;
