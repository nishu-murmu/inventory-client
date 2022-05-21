import React, { useState, useEffect } from 'react';
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
  Button,
  Spinner,
  Box,
  Stack,
  FormLabel,
} from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Purchase = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [sku, setSku] = useState('');
  const [start, setStart] = useState(new Date());
  const [quantity, setQuantity] = useState('');
  const [purchasedata, setPurchaseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedsku, setSelectedsku] = useState('');

  const [enteredsku, setEnteredSku] = useState('');
  const [update, setUpdate] = useState(new Date());
  const [newQuantity, setNewQuantity] = useState('');
  const newQuantityChange = e => {
    setNewQuantity(e.target.value);
  };

  const quantityChange = e => {
    setQuantity(e.target.value);
  };

  // create product
  const submitHandler = async e => {
    e.preventDefault();
    // e.preventDefault();
    await fetch('http://localhost:3001/api/purchase/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mastersku: sku,
        Date: start,
        quantity: quantity,
      }),
    });
  };
  // get list of products
  const getListHandler = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:3001/api/purchase/getAll');
    const result = await response.json();
    setIsLoading(false);
    setPurchaseData(result);
  };
  // update product
  const updateHandler = () => {
    fetch('http://localhost:3001/api/purchase/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mastersku: enteredsku,
        date: update,
        quantity: newQuantity,
      }),
    });
  };
  // delete product
  const deleteHandler = async () => {
    await fetch('http://localhost:3001/api/purchase/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mastersku: selectedsku,
      }),
    });
  };
  // sorting product

  useEffect(() => {
    getListHandler();
  }, []);

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
              }}
              style={{ margin: '20px' }}
            >
              <Input
                placeholder="Enter SKU"
                list={'mastersku'}
                textAlign="center"
                name={'mastersku'}
                onChange={e => {
                  setSku(e.target.value);
                }}
                required
              />
              <DatePicker
                selected={start}
                onChange={date => setStart(date)}
              ></DatePicker>
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
          {isLoading && <Spinner size={'xl'} />}

          {!isLoading && (
            <TableContainer
              rounded={'lg'}
              boxShadow={'lg'}
              h={250}
              overflowY={'auto'}
              overflowX={'hidden'}
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
                    <Th textAlign="center">Edit</Th>
                    <Th textAlign="center">Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {purchasedata.map(val => (
                    <Tr key={val.mastersku}>
                      <Td textAlign={'center'}>{val.mastersku}</Td>
                      <Td textAlign={'center'}>{val.date}</Td>
                      <Td textAlign={'center'}>{val.quantity}</Td>
                      <Td>
                        <Button colorScheme="teal" onClick={onOpen}>
                          Edit
                        </Button>
                        <Drawer
                          isOpen={isOpen}
                          placement="right"
                          onClose={onClose}
                        >
                          <DrawerOverlay />
                          <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader borderBottomWidth="1px">
                              Edit Product Details
                            </DrawerHeader>

                            <DrawerBody>
                              <Stack spacing="24px">
                                <Box>
                                  <FormLabel htmlFor="master">
                                    Master SKU
                                  </FormLabel>
                                  <Input
                                    id="master"
                                    onChange={e => {
                                      setEnteredSku(e.target.value);
                                    }}
                                    placeholder="Please enter Master SKU"
                                  />
                                  <DatePicker
                                    selected={update}
                                    onChange={date => setUpdate(date)}
                                  ></DatePicker>
                                  <FormLabel htmlFor="quantity">
                                    Quantity
                                  </FormLabel>
                                  <Input
                                    id="quantity"
                                    onChange={newQuantityChange}
                                    placeholder="Please enter Quantity"
                                  />
                                </Box>
                              </Stack>
                            </DrawerBody>

                            <DrawerFooter borderTopWidth="1px">
                              <Button
                                variant="outline"
                                mr={3}
                                onClick={onClose}
                              >
                                Cancel
                              </Button>
                              <Button
                                colorScheme="blue"
                                onClick={updateHandler}
                              >
                                Submit
                              </Button>
                            </DrawerFooter>
                          </DrawerContent>
                        </Drawer>
                      </Td>
                      <Td textAlign={'center'}>
                        <Button
                          onClick={() => {
                            setSelectedsku(val.mastersku);
                            deleteHandler();
                          }}
                          colorScheme={'red'}
                        >
                          Delete
                        </Button>
                      </Td>
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

export default Purchase;
