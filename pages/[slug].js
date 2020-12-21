import Articles from "../components/articles";
import PageComponent from "../components/pagecomponent";
import { fetchAPI } from "../lib/api";

const Page = ({page,articles})=> {

  return(
    <>
      <PageComponent articles={articles}>
        <Articles articles={articles}/>
      </PageComponent>
    </>
  )
}

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles?status=published");
  console.log(articles.length);
  return {
    paths: ["1","2","3"].map((p) => ({
      params: {
        slug: p,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //GET /users?_start=10&_limit=10
  //const articles = await fetchAPI(`/articles?slug=${params.slug}&status=published`);
  const start = 5 + ((params.slug - 1) * 4);
  const articles = await fetchAPI(`/articles?_start=${start}&status=published&_sort=publishedAt:desc`);
  console.log(params);
  return {
    props: { page:params.slug ,articles },
    revalidate: 1,
  };
}

export default Page;