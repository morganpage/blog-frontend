import { Heading } from "@chakra-ui/react";
import Articles from "../../components/articles";
import Layout from "../../components/layout";
import { fetchAPI } from "../../lib/api";
import Seo from "../../components/seo";

const Category = ({ category, categories }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  };

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <Heading>{category.name}</Heading>
      <Articles articles={category.articles} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const categories = await fetchAPI("/categories");
  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = (await fetchAPI(`/categories?slug=${params.slug}`))[0];
  const categories = await fetchAPI("/categories");
  return {
    props: { category, categories },
    revalidate: 1,
  };
}

export default Category;
