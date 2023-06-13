import React from "react";
import { Container as UiContainer } from "theme-ui";

const Container = ({ sx, ...props }) => {
  var style = {
    mx: "auto",
    px: [3, 3, 4],
    py: [3]
  };
  return (
    <UiContainer
      sx={{
        ...style,
        ...sx
      }}
      {...props}
    >
      {props.children}
    </UiContainer>
  );
};

export default Container;
