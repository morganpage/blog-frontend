import { Box,Flex } from "@chakra-ui/react";
import Footer from "./footer";
import Nav from "./nav";

const Layout = ({children,categories,links}) => (
  <Box pt={8} px={8} maxWidth={1280} mx="auto" >
    <Nav categories={categories}/>
    {children}
    <Footer/>
  </Box>
)

export default Layout;