import { fetchAPI } from "../lib/api";
import { Box, Flex, Heading, Stack, Text, Link } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";

const Footer = () => {
  const { groupedLinks, copyright } = useContext(GlobalContext);
  return (
    <footer>
      <hr />
      <Flex pl={8} direction={{ md: "row", sm: "column" }}>
        {Object.keys(groupedLinks).map((g,index) => (
          <Box key={index} minWidth="280px">
            <Heading fontSize="xl">{g}</Heading>
            <Stack>
              {groupedLinks[g].map(l =><Link key={l.name} href={l.url}>{l.name}</Link>)}
            </Stack>
          </Box>
        ))}
      </Flex>
      <Text textAlign="center" py={12}>
       {copyright}
      </Text>
    </footer>
  );
};

export default Footer;
