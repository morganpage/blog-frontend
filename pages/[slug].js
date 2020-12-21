import Articles from "../components/articles";
import PageComponent from "../components/pagecomponent";
import { fetchAPI } from "../lib/api";
import { articlesPerPage, getPages } from "../lib/pagination";

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
  const article_count = await fetchAPI("/articles/count?status=published");
  let p = [];
  for (let i = 2; i <= getPages(article_count); i++) {
    p.push({params:{slug: i.toString()}});
  }
  return {
    paths: p,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //GET /users?_start=10&_limit=10
  //const articles = await fetchAPI(`/articles?slug=${params.slug}&status=published`);
  const start = (articlesPerPage+1) + ((params.slug - 2) * articlesPerPage);
  const articles = await fetchAPI(`/articles?_start=${start}&status=published&_limit=4&_sort=publishedAt:desc`);
  //console.log(params);
  return {
    props: { page:params.slug ,articles },
    revalidate: 1,
  };
}

export default Page;