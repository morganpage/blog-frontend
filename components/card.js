import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "./image";
import Link from "next/link";
import Moment from "react-moment";

const Card = ({ article}) => article ? (
  <Box boxShadow="sm"  _hover={{ bg: "#ebedf0",boxShadow: "lg",transform:"translate(-1px,-1px)"  }} _active={{ bg: "#dddfe2" }} h={{lg:"100%", base: "auto"}} overflow="hidden" >
    <Link href={`/article/${article.slug}`} >
      <a>
        <Box h="20%" minHeight="200px"  _hover={{ bg: "#ebedf0"}}>
          <Image nocaption prefix="small_" image={article.image} style={{ opacity: 1, width: "100%", height: "100%", objectFit: "cover" }} />
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
) : null;

export default Card;
