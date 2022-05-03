import React, {useState} from 'react'
import {
  Box,
  Heading,
  HStack,
  Input,
  FormControl,
  Table,
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

  const [startDate, setStartDate] = useState(new Date())

  const handleChange = (date) => {  
      setStartDate(date)  
  } 
  const formSubmitHandler = () => {
    console(startDate)
  }
  return (
    <Box p={4}>
      <Heading className="purchaseReturn-heading" size={'lg'} pb={10}>
        Purchase Return Section
      </Heading>
      <HStack pb={8}>
        <Input placeholder="Enter SKU" textAlign="center" />
        <FormControl onSubmit={ formSubmitHandler }>  
        <Box className="form-group">  
          <DatePicker  
              selected={startDate} 
              onChange={ handleChange }  
              name="startDate"  
              dateFormat="MM/dd/yyyy"  
          />
        </Box>  
      </FormControl>
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

export default PurchaseReturn;
