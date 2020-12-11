import {
  Box,
  FormControl,
  Input,
  Button,
  InputLeftElement,
  Icon,
  InputGroup,
  Text,
  Stack,
  Flex,
  Checkbox,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import Image from "next/image";

export default function EmailForm() {
  //const [email, setEmail] = useState("");
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const onSubmit = (data,e) => {

    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    })


    e.target.reset();
  }

  return (
    <Box borderWidth="2px" p={8}>
      <Heading>Subscribe to our newsletter</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex>
          {/* <Box pr={4}>
        <Image src="/whitepaper.png" width={124} height={188} />
        </Box> */}
          <FormControl isRequired pt={2} align="center">
            <Input name="name" placeholder="Your name" ref={register} />
            <Input type="email" name="email" placeholder="Your email" ref={register} mt={2} />
            {/* <Flex alignItems="start" mt={2}>
          <Checkbox pt={1}></Checkbox>
          <Text fontSize="xs" ml={2}>I am happy to receive occassional marketing emails, and for my data to be stored by Dual Good Health </Text>
          </Flex> */}
            <Button variant="outline" size="lg" fontSize="xl" fontWeight="bold" border="2px" borderColor="gray.600" type="submit" mt={6} >
              Subscribe
            </Button>
          </FormControl>
        </Flex>
        {/* <Button size="xs" colorScheme ="main" width="100%" mt={4} type="submit" fontWeight="semibold" py={6} fontSize="xl">
        Subscribe
      </Button> */}
        {/* <Stack isInline py={6} align="center" justify="center">
        <Icon name="lock" />
        <Text fontSize="sm">This service is completely free. A credit card is NOT required.</Text>
      </Stack> */}
      </form>
    </Box>
  );
}
