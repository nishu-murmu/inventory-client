import {
  Spacer,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Button,
  Heading,
  Icon,
  Image,
  // useColorModeValue,
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
      width={'100%'}
      px={20}
      py={5}
      spacing={80}
      // bg={useColorModeValue('#cdf7f4', '#056159')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
    >
      <HStack padding={'5px 0px'}>
        <Image
          h={6}
          w={6}
          src="https://static.wixstatic.com/media/e8b152_208521582452447ba04576ebbef28ac2~mv2.png/v1/fill/w_48,h_51,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e8b152_208521582452447ba04576ebbef28ac2~mv2.png"
        />
        <Heading as={'h2'} size={'lg'}>
          <Link to="/">Inventory Management</Link>
        </Heading>
      </HStack>
      <Spacer />
      <HStack spacing={5}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Menu>
          <MenuButton as={Button} cursor={'pointer'} variant={'outline'}>
            <Icon as={FaUser} />
          </MenuButton>
          <MenuList>
            <Link to="/account">
              <MenuItem>Account Settings</MenuItem>
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
