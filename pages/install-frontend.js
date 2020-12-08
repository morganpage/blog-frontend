import { useForm } from "react-hook-form";
import { Box, Flex, FormControl, FormLabel, Heading, Input, Link, Spacer,Text } from "@chakra-ui/react";
import Nav from "../components/nav";
import Footer from "../components/footer";

const InstallFrontend = () => {
  const { register, watch } = useForm();
  const envParams = () =>
    `${process.env.NEXT_PUBLIC_DEPLOY_FRONTEND}#NEXT_PUBLIC_STRAPI_API_URL=${watch("STRAPI_API_URL")}`;
  return (
    <Flex pt={8} px={8} maxWidth={1280} mx="auto" flexDirection="column" height="100vh">
      <Nav />
      <Box pt={8} px={8} maxWidth={720} mx="auto" align="center" mb={"auto"}>
        <Heading  as="h1" size="2xl">Deploy Your Blog Frontend</Heading>
        <Heading as="h3" size="md" py={4} color="gray.600">Deploys a static site to Netlify</Heading>
        <Text>Please sign up for a free github account <Link href="https://github.com/" color="teal.500" isExternal>here</Link></Text>
        <Text>Then click on 'Deploy to Netlify'</Text>
        <FormControl id="NEXT_PUBLIC_STRAPI_API_URL" py={4}>
          <FormLabel>Strapi API url</FormLabel>
          <Input name="STRAPI_API_URL" placeholder="Strapi API url" ref={register} />
        </FormControl>
        <a href={`https://app.netlify.com/start/deploy?repository=${envParams()}`}>
          <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy" />
        </a>
      </Box>
      <Spacer/>
      <Footer/>
    </Flex>
  );
};

export default InstallFrontend;
