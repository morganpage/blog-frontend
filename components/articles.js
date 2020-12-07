import { Box, Flex } from "@chakra-ui/react";
import Card from "./card";

const Articles = ({ articles }) => {
  return (
    <Flex flexWrap="wrap" >
      {Array.isArray(articles) && articles.filter(a => a.status == 'published').map((article) => (
        <Box key={article.slug} w={{lg:"50%",sm:"100%"}} px={6} py={4} >
        <Card article={article} />
        </Box>
      ))}
    </Flex>
  );
};

export default Articles;
