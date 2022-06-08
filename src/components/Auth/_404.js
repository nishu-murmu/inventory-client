import { Stack, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../../pages/AnimatedPage';

const Error404 = () => {
  return (
    <AnimatedPage>
      <Stack py={300}>
        <Text>User not found!</Text>
        <Text>Or username or password wrong!</Text>
        <Link to={'/login'}>
          <Button>Login Page</Button>
        </Link>
      </Stack>
    </AnimatedPage>
  );
};

export default Error404;
