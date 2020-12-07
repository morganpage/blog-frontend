import { Box, Flex, Heading } from "@chakra-ui/react";
import Card from "./card";
import EmailFormNetlify from "./EmailFormNetlify";

const Featured = ({ article }) => {
  return (
    <Flex flexWrap="wrap">
      <Box w={{ lg: "60%",  sm: "100%" }} px={6} py={4} h="100%">
        <Card article={article} />
      </Box>
      <Box w={{ lg: "40%", sm: "100%" }} px={6} py={4}>
        <EmailFormNetlify />
      </Box>
    </Flex>
  );
};

export default Featured;
