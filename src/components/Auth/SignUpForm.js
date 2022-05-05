import {useRef} from 'react'
import {
  Stack,
  Text,
  HStack,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';

import {Link} from 'react-router-dom'

const SignUp = () => {

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredFirstName = firstNameRef.current.value;
    const enteredLastName = lastNameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    console.log(`${enteredFirstName} ${enteredLastName}, email: ${enteredEmail}, password: ${enteredPassword}`)
  }

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
              <Input id="first-name" ref={firstNameRef} type="text" required />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="last-name">Last Name</FormLabel>
              <Input id="last-name" ref={lastNameRef} type="text" required />
            </FormControl>
          </HStack>
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
              <Text>Already a user?</Text>
              <Link to='/login'>
                <Text color={'blue.200'}>Login</Text>
              </Link>
            </Stack>
            <Button
              onClick={submitHandler}
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
