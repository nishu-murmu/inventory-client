import {
    Container,
    Stack,
    Box,
    Text,
    Spacer,
    Icon,
    useColorModeValue,
  } from '@chakra-ui/react';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';


const Footer = () => {
    return <Box
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
      <Text>© 2022 F3 E-Commerce Consultancy. All rights reserved</Text>
      <Spacer />
      <Stack direction={'row'} spacing={6}>
        <Icon as={FaLinkedin} />
        <Icon as={FaFacebook} />
        <Icon as={FaInstagram} />
      </Stack>
    </Container>
  </Box>
}

export default Footer