import React from 'react'
import HamburgerIcon from './hamburger'
import LogoIcon from './logo'
function Icon (props) {
  switch (props.symbol) {
    case 'hamburger':
      return <HamburgerIcon />
    case 'logo':
      return <LogoIcon />
    default:
      return <span>Unknown icon: {props.symbol}</span>
  }
}

export default Icon
