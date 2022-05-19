import React, { useState, useEffect } from 'react';
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
  Spinner,
} from '@chakra-ui/react';

const PurchaseReturn = () => {
  const [start, setStart] = useState(new Date());
  const [quantity, setQuantity] = useState('');
  const [purchaseReturndata, setPurchaseReturnData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const quantityChange = e => {
    setQuantity(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    fetch('http://localhost:3001/api/purchaseReturn/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Date: start,
        quantity: quantity,
      }),
    });
  };

  const getListHandler = async () => {
    setIsLoading(true);
    const response = await fetch(
      'http://localhost:3001/api/purchaseReturn/getAll'
    );
    const result = await response.json();
    setIsLoading(false);
    setPurchaseReturnData(result);
  };

  useEffect(() => {
    getListHandler();
  }, []);

  return (
    <VStack>
      <Heading as={'h1'} size={'lg'}>
        Purchase Return Section
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
                list={'purchasemastersku'}
                name={'mastersku'}
                textAlign="center"
                required
              />
              <datalist id="purchasemastersku">
                <option value={'bar'} />
                <option value={'car'} />
                <option value={'far cry 3'} />
              </datalist>

              <Input type={'date'} onSelect={date => setStart(date)} />
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
            Purchase Return Table
          </Heading>
          {isLoading && <Spinner size={'xl'} />}

          {!isLoading && (
            <TableContainer
              rounded={'lg'}
              boxShadow={'lg'}
              h={250}
              overflowY={'auto'}
              overflowX={'hidden'}
              // bg={useColorModeValue('gray.100', 'gray.700')}
            >
              <Table variant="simple">
                <Thead
                  position={'sticky'}
                  top={0}
                  backgroundColor={'lightblue'}
                >
                  <Tr>
                    <Th textAlign="center">SKU</Th>
                    <Th textAlign="center">Date</Th>
                    <Th textAlign="center">Quantity</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {purchaseReturndata.map(val => (
                    <Tr key={val._id}>
                      <Td textAlign={'center'}>{val.SKU}</Td>
                      <Td textAlign={'center'}>{val.Date}</Td>
                      <Td textAlign={'center'}>{val.quantity}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </VStack>
      </HStack>
    </VStack>
  );
};

export default PurchaseReturn;
