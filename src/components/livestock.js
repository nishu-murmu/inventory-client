import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
// files

const LiveStock = () => {
  return (
    <Box p={4}>
      <Heading size={'lg'} pb={10}>
        Sales Section
      </Heading>
      <Heading size={'md'} pb={4}>
        Sales Table
      </Heading>
      <TableContainer
        rounded={'lg'}
        boxShadow={'lg'}
        h={250}
        overflowY={'auto'}
        overflowX={'hidden'}
        bg={useColorModeValue('gray.100', 'gray.700')}
      >
        <Table variant="simple">
          <Thead position={'sticky'} top={0} backgroundColor={'lightblue'}>
            <Tr>
              <Th textAlign={'center'}>No.</Th>
              <Th textAlign="center">Opening Stock</Th>
              <Th textAlign="center">Purchase</Th>
              <Th textAlign="center">Sales</Th>
              <Th textAlign="center">Sales Return</Th>
              <Th textAlign="center">Purchase Return</Th>
              <Th textAlign="center">Live Stock</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td textAlign={'center'}>1.</Td>
              <Td textAlign="center">example OP</Td>
              <Td textAlign="center">example purchase</Td>
              <Td textAlign="center">example Sales</Td>
              <Td textAlign="center">example salesReturn</Td>
              <Td textAlign="center">example purchaseReturn</Td>
              <Td textAlign="center">example Live stock</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LiveStock;
