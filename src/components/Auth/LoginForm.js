import { useState } from 'react';
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
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const submitHandler = e => {
    e.preventDefault();
    fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    });
  };

  const emailChange = e => {
    setEnteredEmail(e.target.value);
  };

  const passwordChange = e => {
    setEnteredPassword(e.target.value);
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
        <form onSubmit={submitHandler}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Enter Email:</FormLabel>
              <Input id="email" type="email" onChange={emailChange} required />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password">Enter Password:</FormLabel>
              <Input
                id="password"
                type="password"
                onChange={passwordChange}
                required
              />
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
                  color={'white'}
                  _hover={{ color: 'blue.500' }}
                >
                  Sign in
                </Button>
              </Link>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default Login;
