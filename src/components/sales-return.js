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

const SalesReturn = () => {
  return (
    <Box p={4}>
      <Heading size={'lg'} pb={10}>
        Sales Return Section
      </Heading>
      <Heading size={'md'} pb={4}>
        Sales Return Table
      </Heading>
      <TableContainer
        rounded={'lg'}
        boxShadow={'lg'}
        p={8}
        bg={useColorModeValue('white', 'gray.700')}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center">SKU</Th>
              <Th textAlign="center">Date</Th>
              <Th textAlign="center">Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td textAlign="center">example sku</Td>
              <Td textAlign="center">example date</Td>
              <Td textAlign="center">example quantity</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesReturn;
