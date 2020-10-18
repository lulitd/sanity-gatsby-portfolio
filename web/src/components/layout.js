import React from 'react'
import Header from './header'
import Footer from './footer'
import { Flex, Box } from 'rebass'

const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle, author, mainStyle,...rest}) => (
  <Flex flexDirection='column' minHeight='100vh'{...rest}

  sx={{
  }}
  >
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <Box sx={{ width: '100%', flex: '1 1 auto', ...mainStyle}} as='main'>
      {children}
    </Box>
    <Footer author={author} />
  </Flex >
)

export default Layout
