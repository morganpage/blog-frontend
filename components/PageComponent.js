import {useContext ,useState} from 'react';
import { GlobalContext } from "../pages/_app";
import { Heading } from "@chakra-ui/react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Featured from "../components/featured";
import Pagination from '@material-ui/lab/Pagination';
import { Text, Box, Flex, Spacer } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import { getPages } from '../lib/pagination';

const PageComponent = ({children}) => {
  const router = useRouter()
  const { links,categories,homepage,articles,article_count } = useContext(GlobalContext);
  let featured = articles[0];

  const handlePagination = (event, value) =>{
    if(value == 1)
      router.push("/");
    else
      router.push("/" + value);

  }

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
      <Flex justifyContent="center"><Pagination count={getPages(article_count)} page={parseInt(router.query.slug) || 1} onChange={handlePagination} /></Flex>
      
    </Layout>
  );


}

export default PageComponent;