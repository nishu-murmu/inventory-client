import React from 'react';

import {
  ChakraProvider,
  VStack,
  HStack,
  Heading,
  Button,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Routes, Route, Link } from 'react-router-dom';
import PurchasePage from './pages/purchasePage';
import PurchaseReturnPage from './pages/purchaseReturnPage';
import SalesPage from './pages/salesPage';
import SalesReturnPage from './pages/salesReturn';

//files

function App() {
  return (
    <ChakraProvider theme={theme}>
      <VStack textAlign="center" padding="20px 0px" fontSize="xl">
        <HStack spacing="8">
          <Heading padding="20px 0px">F3 Inventory Management</Heading>
          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
        <HStack>
          <Button>
            <Link to="/purchase">Purchase</Link>
          </Button>
          <Button>
            <Link to="/purchaseReturn">Purchase Return</Link>
          </Button>
          <Button>
            <Link to="/sales">Sales</Link>
          </Button>
          <Button>
            <Link to="/salesReturn">Sales Return</Link>
          </Button>
        </HStack>
        <Routes>
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/purchaseReturn" element={<PurchaseReturnPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/salesReturn" element={<SalesReturnPage />} />
        </Routes>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
