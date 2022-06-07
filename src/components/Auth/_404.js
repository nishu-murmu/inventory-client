import { Stack, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <Stack py={300}>
      <Text>User not found!</Text>
      <Text>Or username or password wrong!</Text>
      <Link to={'/login'}>
        <Button>Login Page</Button>
      </Link>
    </Stack>
  );
};

export default Error404;
