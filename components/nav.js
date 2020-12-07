import { Text, Box, Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";
import Image from "./image";

const MenuItem = ({ category, children }) => (
  <Box
    py={2}
    px={4}
    _hover={{ color: "#5FDED5" }}
    _active={{ color:"#000" }}
  >
    <Link href={`/category/${category.slug}`}>{category.name}</Link>
  </Box>
);

const Nav = ({ categories }) => {
  const global = useContext(GlobalContext);
  return (
    <Flex  alignItems="center" justifyContent="space-between">
      <Box w={200}>
        {/* <Link href="/" passHref><a><Image src="/logo.svg" width={200} height={100} alt="image"/></a></Link> */}
        <Link href="/"><a><Image image={global.defaultSeo?.shareImage}/></a></Link>
      </Box>
      <Box>
      <Flex justify="center">
        {Array.isArray(categories) && categories.filter(c => c.articles.length > 0).map((category) => (
          <MenuItem key={category.id}  category={category}></MenuItem>
        ))}
      </Flex>
      </Box>
      <Box w={200}>
      {/* <p>Search...</p> */}
      </Box>
    </Flex>
  );
};

export default Nav;
