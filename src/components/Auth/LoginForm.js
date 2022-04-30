import {
  Stack,
  Box,
  Button,
  Link,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  Checkbox,
} from '@chakra-ui/react';

const Login = () => {
  return (
    <Stack spacing={8} mx={'auto'} px={0} py={12}>
      <Heading>User Login</Heading>
      <Box
        rounded={'lg'}
        boxShadow={'lg'}
        p={8}
        bg={useColorModeValue('white', 'gray.700')}
      >
        <Stack spacing={4}>
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
              <Checkbox>Remember Me</Checkbox>
              <Link color={'blue.400'} fontSize="16px">
                Forgot Password?
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

export default Login;
