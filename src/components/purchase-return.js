import React, {useState} from 'react'
import {
  Heading,
  VStack,
  Button,
  HStack,
  Input,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
const PurchaseReturn = () => {
  const [start, setStart] = useState(new Date())

  return (
    <VStack>
      <Heading as={'h1'} size={'lg'}>Purchase Return Section</Heading>
      <HStack px={10} spacing={20}>
      <VStack p={5}>
      <Heading className="purchase-heading" size={'md'} pb={10}>
        Input Products Details
      </Heading>
      <VStack>
        <Input placeholder="Enter SKU" textAlign="center" />
        <DatePicker dateFormat={'dd-MM-yy'} placeholderText='Select Date' selected={start} onSelect={(date:Date) => setStart(date)}/>
        <Input placeholder="Enter Quantity" textAlign="center" />
        <Button w={'100%'}>Submit</Button>
        <Button w={'100%'}>Filter</Button>
      </VStack>
      </VStack>
      <VStack pb={5}>
      <Heading pb={10} size={'md'}>
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
      </VStack>
    </HStack>
    </VStack>
  );
};

export default PurchaseReturn;
