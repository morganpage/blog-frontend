import { Heading } from "@chakra-ui/react";
import { fetchAPI } from "../lib/api";
import Layout from "../components/layout";
import Articles from "../components/articles";
import Seo from "../components/seo";
import Featured from "../components/featured";
import PageComponent from "../components/pagecomponent";

const Home = ({ articles, categories, homepage, links }) => {
  // //articles.sort((a,b) => (new Date(a.publishedAt) < new Date(b.publishedAt)) ? 1 : -1 );
  // let featured = articles[0];
  let nonFeatured = articles.slice(1,articles.length);
  // return (
  //   <Layout categories={categories} links={links}>
  //     <Seo seo={homepage.seo} />
  //     <Heading as="h1" size="2xl"  textAlign="center" mt={8} mb={4}>
  //       {homepage.hero?.title}
  //     </Heading>
  //     <Heading color="gray.600" as="h2" size="md" textAlign="center" pt={0} pb={6}>
  //       {homepage?.seo?.metaDescription}
  //     </Heading>
  //     <Featured article={featured}/>
  //     <Articles articles={nonFeatured} />
  //   </Layout>
  // );
  return (
    <PageComponent>
      <Articles articles={nonFeatured} />
    </PageComponent>
  )
};

export async function getStaticProps() {
  // Run API calls in parallel //_sort=email:asc,dateField:desc //&_limit=10
  const [articles, categories, homepage,links] = await Promise.all([
    fetchAPI("/articles?status=published&_limit=5&_sort=publishedAt:desc"),
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
    fetchAPI("/links"),
  ]);

  return {
    props: { articles, categories, homepage,links },
    revalidate: 1,
  };
}

export default Home;
