import { Heading, Button } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import AnimatedPage from '../../pages/AnimatedPage';

const Error404 = () => {
  const nav = useNavigate();
  const location = useLocation();
  const name = location.state.name;
  return (
    <AnimatedPage>
      <Heading pt={260}>
        <strong>{name}</strong>
      </Heading>
      <Button
        mb={260}
        onClick={() => {
          nav('/login', { state: { name: name } });
        }}
      >
        Login Page
      </Button>
    </AnimatedPage>
  );
};

export default Error404;
