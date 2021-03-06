import { useEffect, useState } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [show, setShow] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isCorrect, setIsCorrect] = useState('');
  const [touch, setTouch] = useState(false);
  const nav = useNavigate();
  const toast = useToast();

  const submitHandler = async e => {
    e.preventDefault();
    const response = await fetch(
      'https://shrouded-brushlands-07875.herokuapp.com/api/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
      }
    );
    const result = await response.json();
    if (result.message === undefined) {
      setIsCorrect('');
      localStorage.setItem('token', result);
      nav('/livestock');
    }
    if (result.message === 'Wrong username or password') {
      setIsCorrect('Incorrect email or password!');
    }
    if (result.message === 'User not found!') {
      setIsCorrect('User not found!');
    }
  };

  const emailChange = e => {
    setEnteredEmail(e.target.value);
  };

  const passwordChange = e => {
    setEnteredPassword(e.target.value);
  };

  const handleClick = () => setShow(!show);
  useEffect(() => {
    if (isCorrect !== '') {
      toast({
        title: 'Error!',
        description: isCorrect,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isCorrect, toast, touch]);
  return (
    <Stack spacing={8} mx={'auto'} pt={20}>
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
              <Input
                size={'sm'}
                borderRadius={6}
                id="email"
                type="email"
                onChange={emailChange}
                required
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password">Enter Password:</FormLabel>
              <InputGroup>
                <Input
                  borderRadius={6}
                  size={'sm'}
                  id="password"
                  type={show ? 'text' : 'password'}
                  onChange={passwordChange}
                  required
                />
                <InputRightElement pb={1.5} onClick={handleClick}>
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
                borderRadius={6}
                size={'sm'}
                w={'100%'}
                type={'submit'}
                bg={'blue.400'}
                color={'white'}
                _hover={{ color: 'blue.500' }}
                onClick={() => setTouch(!touch)}
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
