import React, {useState, useRef} from 'react'
import {
  Heading,
  VStack,
  Button,
  HStack,
  Input,
  Table,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from '@chakra-ui/react';

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
const PurchaseReturn = () => {
  const sku = useRef()
  const [start, setStart] = useState(new Date())
  const quantity = useRef()
  const submitHandler = () => {
    const enteredSku = sku.current.value;
    const enteredQuantity = quantity.current.value;
    console.log(enteredSku+","+start+","+enteredQuantity)
  }

  return (
    <VStack>
      <Heading as={'h1'} size={'lg'}>Purchase Return Section</Heading>
      <HStack px={10} spacing={20}>
      <VStack p={5}>
      <Heading className="purchase-heading" size={'md'} pb={10}>
        Input Products Details
      </Heading>
      <VStack>
        <Input placeholder="Enter SKU" ref={sku} textAlign="center" />
        <DatePicker dateFormat={'dd-MM-yy'} placeholderText='Select Date' selected={start} showPopperArrow={true} onSelect={(date:Date) => setStart(date)}/>
        <Input placeholder="Enter Quantity" ref={quantity} textAlign="center" />
        <Button w={'100%'} onClick={submitHandler}>Submit</Button>
        <Menu>
          <MenuButton w={'100%'} as={Button}>
            Filter
          </MenuButton>
          <MenuList>
            <MenuItem>SKU</MenuItem>
            <MenuItem>Date</MenuItem>
            <MenuItem>Quantity</MenuItem>
          </MenuList>
        </Menu>
      </VStack>
      </VStack>
      <VStack>
      <Heading pb={5} size={'md'}>
        Purchase Return Table
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
          <Thead  position={'sticky'} top={0} backgroundColor={'lightblue'}>
            <Tr>
              <Th textAlign={'center'}>No.</Th>
              <Th textAlign="center">SKU</Th>
              <Th textAlign="center">Date</Th>
              <Th textAlign="center">Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td textAlign={'center'}>1.</Td>
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
