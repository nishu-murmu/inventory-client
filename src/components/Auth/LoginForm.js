import { useRef } from 'react';
import {
  Stack,
  Box,
  Button,
  FormControl,
  Text,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  Checkbox,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = e => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    console.log(`${enteredEmail} , ${enteredPassword}`);
  };
  return (
    <Stack spacing={8} mx={'auto'} py={40}>
      <Heading>User Login</Heading>
      <Box
        rounded={'lg'}
        boxShadow={'lg'}
        p={8}
        bg={useColorModeValue('gray.100', 'gray.700')}
      >
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Enter Email:</FormLabel>
            <Input id="email" ref={emailRef} type="email" required />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Enter Password:</FormLabel>
            <Input id="password" ref={passwordRef} type="password" required />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify="space-between"
            >
              <Checkbox>Remember Me</Checkbox>
              <Text color={'blue.400'} fontSize="16px">
                Forgot Password?
              </Text>
            </Stack>
            <Link to={'/livestock'}>
              <Button
                w={'100%'}
                bg={'blue.400'}
                // onSubmit={submitHandler}
                color={'white'}
                _hover={{ color: 'blue.500' }}
              >
                Sign in
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Login;
