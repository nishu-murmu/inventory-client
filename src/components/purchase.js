import React,{useState} from 'react'
import {
  VStack,
  HStack,
  Heading,
  Input,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const Purchase = () => {
  const [start, setStart] = useState(new Date()); 
  return (
    <HStack p={10}>
      <VStack p={10}>
      <Heading className="purchase-heading" size={'md'} pb={5}>
        Input Products Details
      </Heading>
      <VStack>
        <Input placeholder="Enter SKU" textAlign="center" />
        <DatePicker placeholder='Select a Date' selected={start} onSelect={(date:Date) => setStart(date)}/>
        <Input placeholder="Enter Quantity" textAlign="center" />
      </VStack>
      <HStack>
        <Button>Filter</Button>
      </HStack>
      </VStack>
      <VStack>
      <Heading p={10} size={'md'}>
        Purchase Table
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
  );
};

export default Purchase;
