import {
  HStack,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <HStack spacing={10} pt={40} pb={10} className="app-nav">
      <Menu>
        <MenuButton as={Button}>Display SKUs</MenuButton>
        <MenuList>
          <Link to="/mapped">
            <MenuItem>Mapped SKUs</MenuItem>
          </Link>
          <Link to="/unmapped">
            <MenuItem>Unmapped SKUs</MenuItem>
          </Link>
        </MenuList>
      </Menu>
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
  );
};
export default Navigation;
