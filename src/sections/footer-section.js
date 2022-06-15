import {
  VStack,
  HStack,
  Stack,
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
      px={16}
      borderTopWidth={1}
      borderStyle={'solid'}
      className={'footer'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <VStack
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ md: 'space-between' }}
        align={{ md: 'center' }}
      >
        <Stack direction={'row'} spacing={6} pt={2}>
          <Link href="https://www.linkedin.com/company/f3-e-commerce-consultancy-llp/mycompany/">
            <Button variant={'ghost'}>
              LinkedIn
              <ExternalLinkIcon w={5} h={4} pl={1} />
            </Button>
          </Link>
          <Link href="https://www.facebook.com/f3ecommerceconsultancyllp/">
            <Button variant={'ghost'}>
              FaceBook
              <ExternalLinkIcon w={5} h={4} pl={1} />
            </Button>
          </Link>
          <Link href="https://instagram.com/f3ecommerceconsultancyllp?utm_medium=copy_link">
            <Button variant={'ghost'}>
              Instagram
              <ExternalLinkIcon w={5} h={4} pl={1} />
            </Button>
          </Link>
        </Stack>
        <HStack>
          <Text fontSize={'16px'}>
            © {year} F3 E-Commerce Consultancy. All rights reserved
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Footer;
