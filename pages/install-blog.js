import { useForm } from "react-hook-form";
import { Box, Flex, FormControl, FormLabel, Heading, Input, Link, Spacer, Text, Button, chakra, useToast } from "@chakra-ui/react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { useState } from "react";
import ReactPlayer from "react-player";

const InstallBlog = () => {
  const [state, setState] = useState({ email: "" });
  const { register, handleSubmit, watch } = useForm();
  const toast = useToast();
  const envParamsBE = () =>
    `${process.env.NEXT_PUBLIC_DEPLOY_BACKEND}&env[CLOUDINARY_NAME]=${watch("name")}&env[CLOUDINARY_KEY]=${watch(
      "key"
    )}&env[CLOUDINARY_SECRET]=${watch("secret")}`;

  const envParamsFE = () => `${process.env.NEXT_PUBLIC_DEPLOY_FRONTEND}#NEXT_PUBLIC_STRAPI_API_URL=${watch("STRAPI_API_URL")}`;

  const onSubmit = async (data) => {
    const url = "/api/purchased";
    const settings = {
      method: "POST",
      body: JSON.stringify({ license: data.LICENSE }),
    };
    const response = await fetch(url, settings);
    const body = await response.json();
    setState(body);

    toast({
      title: body.email ? "Success" : "Error",
      description: body.email ? "Your license is valid" : "Invalid license",
      status: body.email ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Flex pt={8} px={8} maxWidth={1280} mx="auto" flexDirection="column" height="100vh">
      <Nav />
      <Box pt={8} px={8} maxWidth={720} mx="auto" align="center" mb={"auto"}>
        <Heading as="h1" size="2xl">
          Deploy Your Blog
        </Heading>
        {/* <Heading as="h3" size="md" py={4} color="gray.600">Deploys a static site to Netlify</Heading>
        <Text>Please sign up for a free github account <Link href="https://github.com/" color="teal.500" isExternal>here</Link></Text>
        <Text>Then click on 'Deploy to Netlify'</Text> */}

        <Box p={4}>
          <Link isExternal href="https://youtu.be/vodxTh2-ehY" color="blue.500" fontWeight="bold">Click here for installation instructions</Link>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="License" py={4} isRequired>
            <FormLabel>License</FormLabel>
            <Input name="LICENSE" placeholder="License" ref={register} />
          </FormControl>
          <Button type="submit">VERIFY PURCHASE</Button>
        </form>
        <Box></Box>
        {state.email && (
          <>
            <Box py={4}>
              <Text>
                <chakra.span fontWeight="bold">Email: </chakra.span>
                {state.email}
                <chakra.span fontWeight="bold"> Product: </chakra.span>
                {state.product}
              </Text>
            </Box>

            <Box pt={8} px={8} maxWidth={720} mx="auto" align="center" mb={"auto"}>
              <Heading as="h2" size="xl">
                Deploy Your Blog Backend
              </Heading>
              <Heading as="h3" size="md" py={4} color="gray.600">
                Deploys a postgres database, a Strapi CMS and links to cloudinary for persistant image storage
              </Heading>
              <Text>
                Please sign up for a free cloudinary account{" "}
                <Link href="https://cloudinary.com/users/register/free" color="teal.500" isExternal>
                  here
                </Link>
              </Text>
              <Text>
                Then go{" "}
                <Link href="https://cloudinary.com/console" color="teal.500" isExternal>
                  here
                </Link>{" "}
                and enter the account details below
              </Text>
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
              <a target="_blank" href={`https://www.heroku.com/deploy/?template=${envParamsBE()}`}>
                <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy" />
              </a>
            </Box>

            <Box pt={8} px={8} maxWidth={720} mx="auto" align="center" mb={"auto"}>
              <Heading as="h2" size="xl">
                Deploy Your Blog Frontend
              </Heading>
              <Heading as="h3" size="md" py={4} color="gray.600">
                Deploys a static site to Netlify
              </Heading>
              <Text>
                Please sign up for a free github account{" "}
                <Link href="https://github.com/" color="teal.500" isExternal>
                  here
                </Link>
              </Text>
              <Text>Then click on 'Deploy to Netlify'</Text>
              <FormControl id="NEXT_PUBLIC_STRAPI_API_URL" py={4}>
                <FormLabel>Strapi API url</FormLabel>
                <Input name="STRAPI_API_URL" placeholder="Strapi API url" ref={register} />
              </FormControl>
              <a target="_blank" href={`https://app.netlify.com/start/deploy?repository=${envParamsFE()}`}>
                <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy" />
              </a>
            </Box>
          </>
        )}
        <Box p={4}>
          <Link isExternal href="https://youtu.be/MTUtBOnpr4s" color="blue.500" fontWeight="bold">How to set up a custom domain (i.e. blogtastic.com)</Link>
        </Box>
      </Box>

      <Spacer />
      <Footer />
    </Flex>
  );
};

export default InstallBlog;
