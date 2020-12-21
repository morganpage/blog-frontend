import {useContext} from 'react';
import { GlobalContext } from "../pages/_app";
import { Heading } from "@chakra-ui/react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Featured from "../components/featured";
import Router from 'next/router';


const PageComponent = ({children}) => {
  const { links,categories,homepage,articles } = useContext(GlobalContext);
  let featured = articles[0];
  return (
    <Layout categories={categories} links={links}>
      <Seo seo={homepage.seo} />
      <Heading as="h1" size="2xl"  textAlign="center" mt={8} mb={4}>
        {homepage.hero?.title}
      </Heading>
      <Heading color="gray.600" as="h2" size="md" textAlign="center" pt={0} pb={6}>
        {homepage?.seo?.metaDescription}
      </Heading>
      <Featured article={featured}/>
      {children}
    </Layout>
  );


}

export default PageComponent;