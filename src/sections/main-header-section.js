import {
  Spacer,
  HStack,
  Heading,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa/index';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
const MainHeader = () => {
  return (
    <HStack
      className="app-header"
      position={'fixed'}
      top={0}
      py={5}
      spacing={80}
      width="auto"
    >
      <Heading padding={'5px 0px'}>
        <Link to="/">F3 Inventory Management</Link>
      </Heading>
      <Spacer />
      <HStack spacing={5}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Menu>
          <MenuButton as={Button} cursor={'pointer'} variant={'outline'}>
            <Icon as={FaUser} />
          </MenuButton>
          <MenuList>
            <Link to="/account">
              <MenuItem>Account</MenuItem>
            </Link>
            <Link to="/">
              <MenuItem>Log out</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default MainHeader;
