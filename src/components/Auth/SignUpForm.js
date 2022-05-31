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
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [firstname, setFirstName] = useState('');
  const [show, setShow] = useState(false);
  const [lastname, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    fetch('http://localhost:3001/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password,
      }),
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
    <Stack spacing={8} mx={'auto'} pt={20} pb={36}>
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
                  id="first-name"
                  onChange={firstNameChange}
                  type="text"
                  required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="last-name">Last Name</FormLabel>
                <Input
                  id="last-name"
                  onChange={lastNameChange}
                  type="text"
                  required
                />
              </FormControl>
            </HStack>
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
                align={'start'}
                pt={5}
                justify="space-between"
              >
                <Text>Already a user?</Text>
                <Link to="/login">
                  <Text color={'blue.200'}>Login</Text>
                </Link>
              </Stack>
              <Button
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
