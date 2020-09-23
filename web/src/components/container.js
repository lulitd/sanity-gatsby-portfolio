import React from 'react'
import {Container as UiContainer} from 'theme-ui' 
import { jsx } from 'theme-ui'
/*@jsx jsx*/
const Container = (props) => {
  return <UiContainer mx='auto' px={[2,4,6]} py={3} {...props}>{props.children}</UiContainer>
}

export default Container
