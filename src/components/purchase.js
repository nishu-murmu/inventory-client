import {
  Box,
  Heading,
  Input,
  Table,
  TableContainer,
  HStack,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from '@chakra-ui/react';

const Purchase = () => {
  return (
    <Box p={4}>
      <Heading className="purchase-heading" size={'lg'} pb={10}>
        Purchase Section
      </Heading>
      <HStack pb={8}>
        <Input placeholder="Enter SKU" textAlign="center" />
        <Input placeholder="Enter Date" textAlign="center" />
        <Input placeholder="Enter Quantity" textAlign="center" />
      </HStack>
      <Heading size={'md'} pb={4}>
        Purchase Return Table
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

export default Purchase;
