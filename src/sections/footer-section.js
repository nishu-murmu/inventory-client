import {
  HStack,
  Flex,
  Box,
  Text,
  Link,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
const year = new Date().getFullYear();

const Footer = () => {
  return (
    <Box
      borderTopWidth={2}
      bottom={0}
      position={'fixed'}
      width={'96%'}
      borderStyle={'solid'}
      className={'footer'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <HStack
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ md: 'space-between' }}
        align={{ md: 'center' }}
      >
        <Flex direction={'row'} spacing={6} pt={2}>
          <Link href="https://www.linkedin.com/company/f3-e-commerce-consultancy-llp/mycompany/">
            <Button variant={'ghost'} size={'sm'}>
              LinkedIn
              <ExternalLinkIcon w={5} h={4} pl={1} />
            </Button>
          </Link>
          <Link href="https://www.facebook.com/f3ecommerceconsultancyllp/">
            <Button variant={'ghost'} size={'sm'}>
              FaceBook
              <ExternalLinkIcon w={5} h={4} pl={1} />
            </Button>
          </Link>
          <Link href="https://instagram.com/f3ecommerceconsultancyllp?utm_medium=copy_link">
            <Button variant={'ghost'} size={'sm'}>
              Instagram
              <ExternalLinkIcon w={5} h={4} pl={1} />
            </Button>
          </Link>
        </Flex>
        <HStack justifyContent={'space-between'}>
          <Text fontSize={'16px'} pt={2}>
            {year} ©{' '}
            <Link href={'https://www.facebook.com/f3ecommerceconsultancyllp/'}>
              F3 E-Commerce Consultancy.
            </Link>{' '}
            All rights reserved.
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Footer;
