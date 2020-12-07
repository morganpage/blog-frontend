import { Box, FormControl, Input, Button, Flex, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const EmailFormNetlify = () => {
  const { register, handleSubmit } = useForm();
  const toast = useToast();

  // useEffect(() => {
  //   if (window.location.search.includes("success=true")) {
  //     setSuccess(true);
  //     toast({
  //       title: "Subscription Success.",
  //       description: "You have successfully subscribed to our newsletter.",
  //       status: "success",
  //       duration: 9000,
  //       isClosable: true,
  //     })
  //   }
  // }, []);

  const onSubmit = (data, e) => {
    // console.log(data);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...data }),
    })
      .then(() => {
        toast({
          title: "Subscription Success.",
          description: "You have successfully subscribed to our newsletter.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => alert(error));

    e.preventDefault();
    e.target.reset();
  };

  return (
    <Box borderWidth="2px" p={8}>
      <Heading>Subscribe to our newsletter</Heading>
      <form onSubmit={handleSubmit(onSubmit)} name="contact" data-netlify="true">
        <Flex>
          <FormControl isRequired pt={2} align="center">
            <Input name="name" placeholder="Your name" ref={register} />
            <Input type="email" name="email" placeholder="Your email" mt={2} ref={register} />
            <Button variant="outline" size="lg" fontSize="xl" fontWeight="bold" border="2px" borderColor="gray.600" type="submit" mt={6}>
              Subscribe
            </Button>
          </FormControl>
        </Flex>
      </form>
    </Box>
  );
};

export default EmailFormNetlify;
