import React from 'react';
import {
  ChakraProvider,
  VStack,
  HStack,
  Heading,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

//files
import DashBoard from './components/dashboard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <VStack textAlign="center" padding="20px 0px" fontSize="xl">
        <HStack spacing="8">
          <Heading padding="20px 0px">F3 Inventory Management</Heading>
          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
        <DashBoard />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
