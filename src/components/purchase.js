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
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { saveAs } from 'file-saver';

const Purchase = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [sku, setSku] = useState('');
  const [start, setStart] = useState(new Date());
  const [quantity, setQuantity] = useState('');
  const [purchasedata, setPurchaseData] = useState([]);
  const [selectedsku, setSelectedsku] = useState('');
  const [mappedArray, setMappedArray] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [enteredsku, setEnteredSku] = useState('');
  const [update, setUpdate] = useState(new Date());
  const [newQuantity, setNewQuantity] = useState('');
  const newQuantityChange = e => {
    setNewQuantity(e.target.value);
  };

  const quantityChange = e => {
    setQuantity(e.target.value);
  };
  const submitToggleHandler = () => {
    setToggleSubmit(!toggleSubmit);
  };
  const toggleRemove = () => {
    setToggleDelete(!toggleDelete);
  };
  const toggleUpdateHandler = () => {
    setToggleUpdate(!toggleUpdate);
  };

  // create product
  const submitHandler = async e => {
    e.preventDefault();
    await fetch(
      'https://cryptic-bayou-61420.herokuapp.com/api/purchase/create',
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
  useEffect(() => {
    const getListHandler = async () => {
      const response = await fetch(
        'https://cryptic-bayou-61420.herokuapp.com/api/purchase/getAll'
      );
      const result = await response.json();
      setPurchaseData(result);
    };
    getListHandler();
  }, [toggleSubmit, toggleDelete]);
  // update product
  const updateHandler = async e => {
    e.preventDefault();
    await fetch(
      'https://cryptic-bayou-61420.herokuapp.com/api/purchase/update',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mastersku: enteredsku,
          date: update,
          quantity: newQuantity,
        }),
      }
    );
  };

  // delete product
  useEffect(() => {
    const deleteHandler = async () => {
      await fetch(
        'https://cryptic-bayou-61420.herokuapp.com/api/purchase/delete',
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mastersku: selectedsku,
          }),
        }
      );
    };
    deleteHandler();
  }, [toggleDelete, selectedsku]);

  // master sku hander
  useEffect(() => {
    const masterskuHandler = () => {
      fetch('https://cryptic-bayou-61420.herokuapp.com/api/master/getAll')
        .then(res => {
          return res.json();
        })
        .then(data => {
          setMappedArray(data);
        });
    };
    masterskuHandler();
  }, []);
  const downloadFile = () => {
    const csv = purchasedata
      .map(item => {
        return JSON.stringify(item);
      })
      .join('\n')
      .replace(/(^\[)|(\]$)/gm, '');
    const blob = new Blob([csv], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, 'purchase.csv');
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
                submitToggleHandler();
              }}
              style={{ margin: '20px' }}
            >
              <Input
                list={'mastersku'}
                onChange={e => {
                  setSku(e.target.value);
                }}
                value={sku}
                autoComplete={'off'}
                textAlign={'center'}
                placeholder={'Enter SKU'}
              />
              <datalist id={'mastersku'}>
                {mappedArray.map(item => (
                  <option key={item._id} value={item.mastersku}>
                    {item.mastersku}
                  </option>
                ))}
              </datalist>
              <DatePicker
                selected={start}
                placeholderText={'Select Date'}
                onChange={date => setStart(date)}
              ></DatePicker>
              <Input
                placeholder="Enter Quantity"
                onChange={quantityChange}
                required
                textAlign="center"
              />
              <Button type={'submit'} variant={'outline'} w={'100%'}>
                Submit
              </Button>
              <Menu>
                <MenuButton w={'100%'} variant={'outline'} as={Button}>
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
          >
            <Table variant="simple">
              <Thead position={'sticky'} top={0} backgroundColor={'lightblue'}>
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
                  <Tr key={val._id}>
                    <Td textAlign={'center'}>{val.mastersku}</Td>
                    <Td textAlign={'center'}>
                      {val.Date.toString().substring(0, 10)}
                    </Td>
                    <Td textAlign={'center'}>{val.quantity}</Td>
                    <Td>
                      <Button colorScheme="teal" onClick={onOpen}>
                        <FiEdit />
                      </Button>
                      <Modal isCentered isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent width={80}>
                          <ModalHeader>Edit Purchase Product</ModalHeader>
                          <ModalCloseButton />
                          <form
                            onSubmit={e => {
                              updateHandler(e);
                              toggleUpdateHandler();
                            }}
                          >
                            <ModalBody>
                              <Input
                                list={'master'}
                                onChange={e => {
                                  setEnteredSku(e.target.value);
                                }}
                                value={enteredsku}
                                autoComplete={'off'}
                                textAlign={'center'}
                              ></Input>
                              <datalist id={'master'}>
                                {mappedArray.map(item => (
                                  <option key={item._id}>
                                    {item.mastersku}
                                  </option>
                                ))}
                              </datalist>
                              <DatePicker
                                selected={start}
                                onChange={date => setUpdate(date)}
                                placeholderText={'Select Date to Update'}
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
                              <Button type="submit" variant="outline">
                                Submit
                              </Button>
                            </ModalFooter>
                          </form>
                        </ModalContent>
                      </Modal>
                    </Td>
                    <Td textAlign={'center'}>
                      <Button
                        onClick={() => {
                          setSelectedsku(val.mastersku);
                          toggleRemove();
                        }}
                        color={'red.800'}
                        colorScheme={'red'}
                      >
                        <MdDelete />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Button onClick={downloadFile}>Download file</Button>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Purchase;
