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
              <Text color={'blue.400'} fontSize="16px">
                Forgot Password?
              </Text>
            </Stack>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{ color: 'blue.500' }}
            >
              <Link to={'/sales'}>Sign in</Link>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Login;
