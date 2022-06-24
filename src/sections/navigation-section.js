import React from 'react';
import {
  Flex,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Navigation = () => {
  return (
    <Flex spacing={10} pt={12} gridColumnGap={4} className="app-nav">
      <Link to="/livestock">
        <Button size={'sm'} _hover={{ color: 'green' }}>
          <FaHome />
        </Button>
      </Link>
      <Menu size={'sm'} pt={2}>
        <MenuButton size={'sm'} as={Button}>
          Display SKUs
        </MenuButton>
        <MenuList>
          <Link to="/master">
            <MenuItem>Master SKUs</MenuItem>
          </Link>
          <Link to="/unmapped">
            <MenuItem>Unmapped SKUs</MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <Link to="/purchase">
        <Button size={'sm'}>Purchase</Button>
      </Link>
      <Link to="/purchaseReturn">
        <Button size={'sm'}>Purchase Return</Button>
      </Link>
      <Link to="/sales">
        <Button size={'sm'}>Sales</Button>
      </Link>
      <Link to="/salesReturn">
        <Button size={'sm'}>Sales Return</Button>
      </Link>
    </Flex>
  );
};
export default Navigation;
