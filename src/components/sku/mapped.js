import {
  Box,
  Heading,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from '@chakra-ui/react';

const Mapped = () => {
  return (
    <Box p={4}>
      <Heading size={'lg'} pb={10}>
        Mapped SKU Section
      </Heading>
      <Heading size={'md'} pb={4}>
        Mapped SKU Table
      </Heading>
      <TableContainer
        rounded={'lg'}
        boxShadow={'lg'}
        overflowY={'auto'}
        overflowX={'scroll'}
        h={400}
        w={800}
        mb={20}
        bg={useColorModeValue('gray.100', 'gray.700')}
      >
        <Table variant="simple">
          <Thead position={'sticky'} top={0} backgroundColor={'lightblue'}>
            <Tr>
              <Th contentEditable={'true'} textAlign={'center'}>
                Heading
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td contentEditable={'true'} textAlign={'center'}>
                test
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Mapped;
