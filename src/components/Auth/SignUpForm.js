import { useState } from 'react';
import {
  Stack,
  Text,
  HStack,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputRightElement,
  InputGroup,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [firstname, setFirstName] = useState('');
  const [show, setShow] = useState(false);
  const [lastname, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    fetch('https://cryptic-bayou-61420.herokuapp.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password,
      }),
    }).then(res => {
      console.log(res.status);
      if (res.status === 200) nav('/login');
    });
  };
  const handleClick = () => setShow(!show);

  const firstNameChange = e => {
    setFirstName(e.target.value);
  };
  const lastNameChange = e => {
    setlastName(e.target.value);
  };
  const emailChange = e => {
    setEmail(e.target.value);
  };
  const passwordChange = e => {
    setPassword(e.target.value);
  };

  return (
    <Stack spacing={8} mx={'auto'} pt={20}>
      <Heading fontSize={'4xl'}>User Sign Up</Heading>
      <Box
        rounded={'lg'}
        boxShadow={'lg'}
        p={8}
        bg={useColorModeValue('gray.100', 'gray.700')}
      >
        <form onSubmit={submitHandler}>
          <FormControl spacing={4}>
            <HStack>
              <FormControl isRequired>
                <FormLabel htmlFor="first-name">First Name</FormLabel>
                <Input
                  borderRadius={6}
                  size={'sm'}
                  id="first-name"
                  onChange={firstNameChange}
                  type="text"
                  required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="last-name">Last Name</FormLabel>
                <Input
                  borderRadius={6}
                  size={'sm'}
                  id="last-name"
                  onChange={lastNameChange}
                  type="text"
                  required
                />
              </FormControl>
            </HStack>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Enter Email:</FormLabel>
              <Input
                borderRadius={6}
                size={'sm'}
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
                align={'start'}
                pt={5}
                justify="space-between"
              >
                <Text size={'sm'}>Already a user?</Text>
                <Link to="/login">
                  <Text size={'sm'} color={'blue.200'}>
                    Login
                  </Text>
                </Link>
              </Stack>
              <Button
                borderRadius={6}
                size={'sm'}
                bg={'blue.400'}
                color={'white'}
                _hover={{ color: 'blue.500' }}
                type={'submit'}
                value={'Sign Up'}
              >
                Sign Up
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Box>
    </Stack>
  );
};

export default SignUp;
