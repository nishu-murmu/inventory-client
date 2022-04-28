import { useState } from 'react';
import { Box, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';

const Auth = () => {
  const [enteredEmail, setEnteredEmaill] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };
  const submitHandler = event => {
    event.preventDefault();
  };
  return (
    <FormControl onSubmit={submitHandler} isRequired>
      <Heading>{!setIsLogin ? 'User Login' : 'User Sign Up'}</Heading>
      <FormLabel htmlFor="email">Enter Email:</FormLabel>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={enteredEmail}
        required
      />
      <FormLabel htmlFor="password">Enter Password:</FormLabel>
      <Input
        id="password"
        type="password"
        placeholder="Enter your password"
        value={enteredPassword}
        required
      />
      <Button onSubmit={submitHandler}>
        {isLogin ? 'Login' : 'Create Account'}
      </Button>
      <Button>{isLogin ? 'Create new account' : 'Login with existing'}</Button>
    </FormControl>
  );
};

export default Auth;
