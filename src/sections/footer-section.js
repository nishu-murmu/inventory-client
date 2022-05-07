import {
  Container,
  Stack,
  Box,
  Text,
  Spacer,
  Link,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <Box
      bottom={0}
      px={16}
      position={'fixed'}
      borderTopWidth={1}
      borderStyle={'solid'}
      className={'footer'}
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
        <Text>© {year} F3 E-Commerce Consultancy. All rights reserved</Text>
        <Spacer />
        <Stack direction={'row'} spacing={6}>
          <Link href="https://www.linkedin.com/company/f3-e-commerce-consultancy-llp/mycompany/">
            <Icon as={FaLinkedin} />
          </Link>
          <Link href="https://www.facebook.com/f3ecommerceconsultancyllp/">
            <Icon as={FaFacebook} />
          </Link>
          <Link href="https://instagram.com/f3ecommerceconsultancyllp?utm_medium=copy_link">
            <Icon as={FaInstagram} />
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
