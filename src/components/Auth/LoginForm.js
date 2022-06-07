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
  InputRightElement,
  InputGroup,
  useColorModeValue,
  Checkbox,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [show, setShow] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const nav = useNavigate();
  const submitHandler = async e => {
    e.preventDefault();
    await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    }).then(res => {
      if (res.status === 200) {
        nav('/livestock');
      }
      if (res.status === 404) {
        nav('/_404');
      }
    });
  };

  const emailChange = e => {
    setEnteredEmail(e.target.value);
  };

  const passwordChange = e => {
    setEnteredPassword(e.target.value);
  };

  const handleClick = () => setShow(!show);
  return (
    <Stack spacing={8} mx={'auto'} pt={40} pb={20}>
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
              <InputGroup>
                <Input
                  id="password"
                  type={show ? 'text' : 'password'}
                  onChange={passwordChange}
                  required
                />
                <InputRightElement onClick={handleClick}>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                pt={5}
                align={'start'}
                justify="space-between"
              >
                <Checkbox>Remember Me</Checkbox>
                <Text color={'blue.400'} fontSize="16px">
                  Forgot Password?
                </Text>
              </Stack>
              <Button
                w={'100%'}
                type={'submit'}
                bg={'blue.400'}
                color={'white'}
                _hover={{ color: 'blue.500' }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default Login;

// use useNavigate to navigate after authentication
