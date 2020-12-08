import { useForm } from "react-hook-form";
import { Box, Flex, FormControl, FormLabel, Heading, Input, Link, Spacer,Text } from "@chakra-ui/react";
import Nav from "../components/nav";
import Footer from "../components/footer";

const InstallBackend = () => {
  const { register, watch } = useForm();
  const envParams = () =>
    `${process.env.NEXT_PUBLIC_DEPLOY_BACKEND}&env[CLOUDINARY_NAME]=${watch("name")}&env[CLOUDINARY_KEY]=${watch(
      "key"
    )}&env[CLOUDINARY_SECRET]=${watch("secret")}`;
  return (
    <Flex pt={8} px={8} maxWidth={1280} mx="auto" flexDirection="column" height="100vh">
      <Nav />
      <Box pt={8} px={8} maxWidth={720} mx="auto" align="center" mb={"auto"}>
        <Heading  as="h1" size="2xl">Deploy Your Blog Backend</Heading>
        <Heading as="h3" size="md" py={4} color="gray.600">Deploys a postgres database, a Strapi CMS and links to cloudinary for persistant image storage</Heading>
        <Text>Please sign up for a free cloudinary account <Link href="https://cloudinary.com/users/register/free" color="teal.500"  isExternal>here</Link></Text>
        <Text>Then go <Link href="https://cloudinary.com/console" color="teal.500" isExternal>here</Link> and enter the account details below</Text>
        <Text>Then click on 'Deploy to Heroku'</Text>
        <FormControl id="key" py={4}>
          <FormLabel>Cloudinary API Key</FormLabel>
          <Input name="key" placeholder="Cloudinary API Key" ref={register} />
        </FormControl>
        <FormControl id="name" py={4}>
          <FormLabel>Cloudinary cloud name</FormLabel>
          <Input name="name" placeholder="Cloudinary cloud name" ref={register} />
        </FormControl>
        <FormControl id="secret" py={4}>
          <FormLabel>Cloudinary API Secret</FormLabel>
          <Input name="secret" placeholder="Cloudinary API Secret" ref={register} />
        </FormControl>
        <a href={`https://www.heroku.com/deploy/?template=${envParams()}`}>
          <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy" />
        </a>
      </Box>
      <Spacer/>
      <Footer/>
    </Flex>
  );
};

export default InstallBackend;
