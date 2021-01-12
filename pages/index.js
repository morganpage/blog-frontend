import Articles from "../components/articles";
import PageComponent from "../components/PageComponent.js";
import {useContext} from 'react';
import { GlobalContext } from "../pages/_app";

const Home = () => {
  const { articles } = useContext(GlobalContext);
  //let featured = articles[0];
  let nonFeatured = articles && articles.slice(1,articles.length);
  return (
    <PageComponent>
      <Articles articles={nonFeatured} />
    </PageComponent>
  )
};

export default Home;
