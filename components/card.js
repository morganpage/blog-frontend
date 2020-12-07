import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "./image";
import Link from "next/link";
import Moment from "react-moment";

const Card = ({ article, maxHeight }) => (
  <Box _hover={{ bg: "#ebedf0" }} _active={{ bg: "#dddfe2" }} h={{lg:"100%", base: "auto"}} overflow="hidden">
    <Link href={`/article/${article.slug}`}>
      <a>
        <Box h="60%" _hover={{ bg: "#ebedf0" }}>
          <Image nocaption prefix="small_" image={article.image} style={{ opacity: 0.9, width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Box p={4}>
          <Heading>{article.title}</Heading>
          <Text fontSize="sm" py={0}>
            <Moment format="MMMM Do, YYYY">{article.publishedAt}</Moment>
          </Text>
          <Text py={4}>{article.description}</Text>
        </Box>
      </a>
    </Link>
  </Box>
);

export default Card;
