import React from 'react';
import {
  ChakraProvider,
  Container,
  Stack,
  VStack,
  Box,
  Text,
  Spacer,
  HStack,
  Heading,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Icon,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa/index';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Routes, Route, Link } from 'react-router-dom';
import PurchasePage from './pages/purchasePage';
import PurchaseReturnPage from './pages/purchaseReturnPage';
import SalesPage from './pages/salesPage';
import SalesReturnPage from './pages/salesReturnPage';
import LoginPage from './pages/Auth/loginPage';
import SignUpPage from './pages/Auth/signUpPage';
import MappedPage from './pages/sku/mappedPage';
import UnMappedPage from './pages/sku/unMappedPage';
//files

function App() {
  const bg = useColorModeValue('teal.100', 'teal.600')
  const color = useColorModeValue('white', 'gray.800')
  return (
    <ChakraProvider theme={theme}>
      <VStack
        className="app-main-section"
        margin={0}
        textAlign={'center'}
        fontSize={'xl'}
      >
        <HStack className="app-header" py={5} spacing={20} width="auto">
          <Heading padding={'5px 0px'}>F3 Inventory Management</Heading>
          <Spacer />
          <HStack spacing={5}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Menu>
              <MenuButton as={Button}>
                <Icon as={FaUser} />
              </MenuButton>
              <MenuList>
                <MenuItem>Account</MenuItem>
                <Link to="/login">
                  <MenuItem>Log out</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
        <HStack spacing={10} pb={10} className="app-nav">
          <Menu>
            <MenuButton as={Button}>Display SKUs</MenuButton>
            <MenuList>
              <MenuItem><Link to='/mapped'>Mapped SKUs</Link></MenuItem>
              <MenuItem><Link to='/unmapped'>Unmapped SKUs</Link></MenuItem>
            </MenuList>
          </Menu>
          <HStack spacing={5}>
            <Link to="/purchase">
              <Button>Purchase</Button>
            </Link>
            <Link to="/purchaseReturn">
              <Button>Purchase Return</Button>
            </Link>
            <Link to="/sales">
              <Button>Sales</Button>
            </Link>
            <Link to="/salesReturn">
              <Button>Sales Return</Button>
            </Link>
          </HStack>
        </HStack>
        <Routes>
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/mapped' element={<MappedPage />}/>
          <Route path='/unmapped' element={<UnMappedPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/purchaseReturn" element={<PurchaseReturnPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/salesReturn" element={<SalesReturnPage />} />
        </Routes>
        <Box
          bottom={0}
          px={16}
          position={'fixed'}
          borderTopWidth={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ md: 'space-between' }}
            align={{ md: 'center' }}
          >
            <Text>© 2022 F3 E-Commerce Consultancy. All rights reserved</Text>
            <Spacer />
            <Stack direction={'row'} spacing={6}>
              <Icon as={FaTwitter} />
              <Icon as={FaYoutube} />
              <Icon as={FaInstagram} />
            </Stack>
          </Container>
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
