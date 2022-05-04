import {
  Stack,
  Text,
  HStack,
  Box,
  Button,
  Link,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';

const SignUp = () => {
  return (
    <Stack spacing={8} mx={'auto'} px={0} py={12}>
      <Heading fontSize={'4xl'}>User Sign Up</Heading>
      <Box
        rounded={'lg'}
        boxShadow={'lg'}
        p={8}
        bg={useColorModeValue('gray.100', 'gray.700')}
      >
        <Stack spacing={4}>
          <HStack>
            <FormControl isRequired>
              <FormLabel htmlFor="first-name">First Name</FormLabel>
              <Input id="first-name" type="text" required />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="last-name">First Name</FormLabel>
              <Input id="last-name" type="text" required />
            </FormControl>
          </HStack>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Enter Email:</FormLabel>
            <Input id="email" type="email" required />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Enter Password:</FormLabel>
            <Input id="password" type="password" required />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify="space-between"
            >
              <Text>Already a user?</Text>
              <Link color={'blue.400'} fontSize="20px">
                Login
              </Link>
            </Stack>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{ color: 'blue.500' }}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SignUp;
