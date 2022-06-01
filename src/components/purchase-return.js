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
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const PurchaseReturn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [sku, setSku] = useState('');
  const [start, setStart] = useState(new Date());
  const [quantity, setQuantity] = useState('');
  const [purchaseReturndata, setPurchaseReturnData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mappedArray, setMappedArray] = useState([]);
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
    await fetch(
      'https://cryptic-bayou-61420.herokuapp.com/purchaseReturn/create',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mastersku: sku,
          Date: start,
          quantity: quantity,
        }),
      }
    );
  };
  // get list of products
  const getListHandler = async () => {
    setIsLoading(true);
    const response = await fetch(
      'https://cryptic-bayou-61420.herokuapp.com/purchaseReturn/getAll'
    );
    const result = await response.json();
    setIsLoading(false);
    setPurchaseReturnData(result);
  };
  // update product
  const updateHandler = () => {
    fetch('https://cryptic-bayou-61420.herokuapp.com/purchaseReturn/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mastersku: enteredsku,
        Date: update,
        quantity: newQuantity,
      }),
    });
  };
  // delete product
  const deleteHandler = async () => {
    await fetch(
      'https://cryptic-bayou-61420.herokuapp.com/purchaseReturn/delete',
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mastersku: selectedsku,
        }),
      }
    );
  };
  // master sku
  const masterskuHandler = () => {
    fetch('https://cryptic-bayou-61420.herokuapp.com/master/getAll')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setMappedArray(data);
      });
  };

  useEffect(() => {
    getListHandler();
    masterskuHandler();
  }, []);

  return (
    <VStack>
      <Heading as={'h1'} size={'lg'}>
        Purchase Return Section
      </Heading>
      <HStack px={10} spacing={20}>
        <VStack p={5}>
          <Heading className="purchase-return-heading" size={'md'} pb={10}>
            Input Products Details
          </Heading>
          <VStack width={60}>
            <form
              onSubmit={e => {
                submitHandler(e);
              }}
              style={{ margin: '20px' }}
            >
              <Select
                onChange={e => {
                  setSku(e.target.value);
                }}
              >
                {mappedArray.map(item => (
                  <option key={item._id}>{item.mastersku}</option>
                ))}
              </Select>
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
                  {purchaseReturndata.map(val => (
                    <Tr key={val._id}>
                      <Td textAlign={'center'}>{val.mastersku}</Td>
                      <Td textAlign={'center'}>
                        {val.Date.toString().substring(0, 10)}
                      </Td>
                      <Td textAlign={'center'}>{val.quantity}</Td>
                      <Td>
                        <Button colorScheme="teal" onClick={onOpen}>
                          Edit
                        </Button>
                        <Modal isCentered isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Edit Purchase Product</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Select
                                onChange={e => {
                                  setEnteredSku(e.target.value);
                                }}
                              >
                                {mappedArray.map(item => (
                                  <option key={item._id}>
                                    {item.mastersku}
                                  </option>
                                ))}
                              </Select>
                              <DatePicker
                                selected={start}
                                onChange={date => setUpdate(date)}
                              ></DatePicker>
                              <Input
                                placeholder="Enter Quantity"
                                onChange={newQuantityChange}
                                required
                                textAlign="center"
                              />
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={onClose}
                              >
                                Close
                              </Button>
                              <Button variant="ghost" onClick={updateHandler}>
                                Submit
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
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

export default PurchaseReturn;
