import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Input,
  Table,
  TableContainer,
  Thead,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// files

const Purchase = () => {
  const [sku, setSku] = useState('');
  const [start, setStart] = useState(new Date());
  const [quantity, setQuantity] = useState('');
  const [purchasedata, setPurchaseData] = useState([]);

  const skuChange = e => {
    setSku(e.target.value);
  };
  const quantityChange = e => {
    setQuantity(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    fetch('http://localhost:3001/api/purchase/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        SKU: sku,
        Date: start.toString(),
        quantity: quantity,
      }),
    });
  };

  const getListHandler = async () => {
    const response = await fetch('http://localhost:3001/api/purchase/getAll');
    const result = await response.json();
    setPurchaseData(result);
  };

  return (
    <VStack>
      <Heading as={'h1'} size={'lg'}>
        Purchase Section
      </Heading>
      <HStack px={10} spacing={20}>
        <VStack p={5}>
          <Heading className="purchase-heading" size={'md'} pb={10}>
            Input Products Details
          </Heading>
          <VStack width={60}>
            <form
              onSubmit={e => {
                submitHandler(e);
                getListHandler(e);
              }}
              style={{ margin: '20px' }}
            >
              <Input
                placeholder="Enter SKU"
                onChange={skuChange}
                textAlign="center"
                required
              />
              <DatePicker
                dateFormat={'dd-MM-yy'}
                placeholderText="Date"
                selected={start}
                showPopperArrow={true}
                required
                onSelect={date => setStart(date)}
              />
              <Input
                placeholder="Enter Quantity"
                onChange={quantityChange}
                required
                textAlign="center"
              />
              <Button type={'submit'} w={'100%'}>
                Submit
              </Button>
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
            </form>
          </VStack>
        </VStack>
        <VStack>
          <Heading pb={5} size={'md'}>
            Purchase Table
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
                  <Th textAlign="center">SKU</Th>
                  <Th textAlign="center">Date</Th>
                  <Th textAlign="center">Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {purchasedata.map(val => (
                  <Tr key={val._id}>
                    <Td textAlign={'center'}>{val.SKU}</Td>
                    <Td textAlign={'center'}>{val.Date}</Td>
                    <Td textAlign={'center'}>{val.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Purchase;
