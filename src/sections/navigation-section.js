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
    return <HStack spacing={10} pb={10} className="app-nav">
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
}
export default Navigation