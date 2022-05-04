import {
    Spacer,
    HStack,
    Heading,
    Button,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    Icon,
  } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa/index';
import {  Link } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
const MainHeader = () => {
    return <HStack className="app-header" py={5} spacing={80} width="auto">
    <Heading padding={'5px 0px'}><Link to='/'>F3 Inventory Management</Link></Heading>
    <Spacer />
    <HStack spacing={5}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Menu>
        <MenuButton as={Button}>
          <Icon as={FaUser} />
        </MenuButton>
        <MenuList>
          <MenuItem>Account</MenuItem>
          <Link to="/signUp">
            <MenuItem>Log out</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </HStack>
  </HStack>
}

export default MainHeader