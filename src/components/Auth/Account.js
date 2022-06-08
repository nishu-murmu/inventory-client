import {
  Avatar,
  Button,
  Heading,
  Tag,
  VStack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
// files
import AnimatedPage from '../../pages/AnimatedPage';
const Account = () => {
  return (
    <AnimatedPage>
      <Stack
        mt={40}
        rounded={'lg'}
        boxShadow={'lg'}
        alignItems={'center'}
        p={10}
        bg={useColorModeValue('gray.100', 'gray.700')}
      >
        <Avatar
          size={'2xl'}
          src="https://avatars.githubusercontent.com/u/71123337?v=4"
        ></Avatar>

        <Heading size={'lg'}>Nishu Murmu</Heading>
        <Tag borderRadius={'full'}>Front-end developer</Tag>
        <Button spacing={6} w={'100%'}>
          Edit Profile
        </Button>
        <VStack fontSize={'16px'} pt={4} spacing={2}>
          <Text>Company</Text>
          <Text>
            <EmailIcon /> Email
          </Text>
          <Text>Location</Text>
        </VStack>
      </Stack>
    </AnimatedPage>
  );
};

export default Account;
