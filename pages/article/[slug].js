const { Heading, Box, Text, Flex } = require("@chakra-ui/react");
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";
import Layout from "../../components/layout";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import Moment from "react-moment";
import Seo from "../../components/seo";
import gfm from "remark-gfm";
import Image from "../../components/image";

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.image);

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };

  return (
    <>
      <Layout categories={categories}>
        <Seo seo={seo} />
        <Box mx="auto" maxWidth={720}>
          <Heading size="xl" as="h1" textAlign="left" p={0} mt={8}>
            {article.title}
          </Heading>
          <Heading color="gray.500" as="h2" size="md" textAlign="left" pt={3} pb={5}>
            {article.description}
          </Heading>

          <Heading color="gray.700" textAlign="left" size="sm" as="h3">
            <Moment format="MMMM Do, YYYY">{article.publishedAt}</Moment>
          </Heading>

          <Box py={8}>
            <Image image={article.image} style={{width:"100%"}}/>
          </Box>

          <ReactMarkdownWithHtml className="markdown" children={article.content.replace(".png",".jpg")} allowDangerousHtml plugins={[gfm]} />
          {article.author && 
          <Box borderWidth="1px" p={8} my={8} borderRadius="10px" >
            <Heading as="h2" size="xl">Author</Heading>
            <Text p={0} color="gray.500" as="sub"><Moment format="MMMM Do, YYYY">{article.publishedAt}</Moment></Text>
            <Flex py={0} alignItems="center">
              <img src={article.author.picture.url} style={{ borderRadius: "50%", height: 80, width: 80 }} />
              <Box p={8}>
                <a style={{fontWeight:"bold"}} href={article.author.linkedinUrl}>{article.author.name}</a>
                <Text p={0} color="gray.500">{article.author.position}</Text>
              </Box>
              {/* <Text>Bio here</Text> */}
            </Flex>
          </Box>}
        </Box>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles?status=published");

  return {
    paths: Array.isArray(articles) && articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(`/articles?slug=${params.slug}&status=published`);
  const categories = await fetchAPI("/categories");

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  };
}

export default Article;
