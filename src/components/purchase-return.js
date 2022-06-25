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
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import { DateRange } from 'react-date-range';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { saveAs } from 'file-saver';

// files
import AnimatedPage from '../pages/AnimatedPage';

const PurchaseReturn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDateRangeOpen,
    onOpen: onDateRangeOpen,
    onClose: onDateRangeClose,
  } = useDisclosure();
  const [sku, setSku] = useState('');
  const [start, setStart] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString().replace(/\//g, '-')
  );
  const [quantity, setQuantity] = useState('');
  const [purchaseReturndata, setPurchaseReturnData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mappedArray, setMappedArray] = useState([]);
  const [selectedsku, setSelectedsku] = useState('');
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [enteredsku, setEnteredSku] = useState('');
  const [update, setUpdate] = useState(new Date());
  const [updateDate, setUpdateDate] = useState('');
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

  // create product
  const submitHandler = async e => {
    e.preventDefault();
    // e.preventDefault();
    await fetch(
      'https://cryptic-bayou-61420.herokuapp.com/api/purchaseReturn/create',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mastersku: sku,
          Date: selectedDate,
          quantity: quantity,
        }),
      }
    );
  };

  // get list of products
  useEffect(() => {
    const getListHandler = async () => {
      const response = await fetch(
        'https://cryptic-bayou-61420.herokuapp.com/api/purchaseReturn/getAll'
      );
      const result = await response.json();
      setPurchaseReturnData(result);
    };
    getListHandler();
  }, [toggleDelete, toggleSubmit]);

  // update product
  const updateHandler = () => {
    fetch(
      'https://cryptic-bayou-61420.herokuapp.com/api/purchaseReturn/update',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mastersku: enteredsku,
          Date: updateDate,
          quantity: newQuantity,
        }),
      }
    );
  };

  // delete product
  useEffect(() => {
    const deleteHandler = async () => {
      await fetch(
        'https://cryptic-bayou-61420.herokuapp.com/api/purchaseReturn/delete',
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

  // master sku
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
    const csv = purchaseReturndata
      .map(item => {
        return JSON.stringify(item);
      })
      .join('\n')
      .replace(/(^\[)|(\]$)/gm, '');
    const blob = new Blob([csv], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, 'purchaseReturn.csv');
  };

  return (
    <VStack>
      <AnimatedPage>
        <Heading as={'h1'} size={'md'}>
          Purchase Return Section
        </Heading>
      </AnimatedPage>
      <HStack px={10}>
        <VStack p={5}>
          <AnimatedPage>
            <Heading className="purchase-return-heading" size={'sm'}>
              Input Products Details
            </Heading>
          </AnimatedPage>
          <AnimatedPage>
            <VStack width={60}>
              <form
                onSubmit={e => {
                  submitHandler(e);
                  submitToggleHandler();
                }}
                style={{ margin: '20px' }}
              >
                <Input
                  size={'sm'}
                  list="sku"
                  onChange={e => {
                    setSku(e.target.value);
                  }}
                  value={sku}
                  autoComplete={'off'}
                  textAlign={'center'}
                  placeholder={'Enter SKU'}
                />
                <datalist id={'sku'}>
                  {mappedArray.map(item => (
                    <option key={item._id}>{item.mastersku}</option>
                  ))}
                </datalist>
                <DatePicker
                  size={'sm'}
                  selected={start}
                  onSelect={date => {
                    setStart(date);
                    setSelectedDate(
                      new Date(date).toLocaleDateString().replace(/\//g, '-')
                    );
                  }}
                  value={start}
                  withPortal
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dateFormat="dd-MM-yyyy"
                  placeholderText={'Select Date'}
                  fixedHeight
                />
                <Input
                  size={'sm'}
                  placeholder="Enter Quantity"
                  onChange={quantityChange}
                  required
                  textAlign="center"
                />
                <Button size={'sm'} type={'submit'} w={'100%'}>
                  Submit
                </Button>
                <Menu>
                  <MenuButton size={'sm'} w={'100%'} as={Button}>
                    Filter
                  </MenuButton>
                  <MenuList>
                    <MenuItem>SKU</MenuItem>
                    <MenuItem>Quantity</MenuItem>
                    <MenuItem onClick={onDateRangeOpen}>
                      Date
                      <Modal
                        size={'sm'}
                        isOpen={isDateRangeOpen}
                        onClose={onDateRangeClose}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalBody>
                            <DateRange
                              onChange={ranges => {
                                setEndDate(ranges.selection.endDate);
                                setStartDate(ranges.selection.startDate);
                              }}
                              staticRanges={undefined}
                              inputRanges={undefined}
                              ranges={[
                                {
                                  startDate: startDate,
                                  endDate: endDate,
                                  key: 'selection',
                                },
                              ]}
                              maxDate={new Date()}
                              showMonthAndYearPickers={true}
                              moveRangeOnFirstSelection={false}
                              showDateDisplay={false}
                            />
                          </ModalBody>
                        </ModalContent>
                      </Modal>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </form>
            </VStack>
          </AnimatedPage>
        </VStack>
        <VStack>
          <AnimatedPage>
            <Heading pb={5} size={'sm'}>
              Purchase Return Table
            </Heading>
          </AnimatedPage>

          <AnimatedPage>
            <TableContainer
              rounded={'lg'}
              boxShadow={'lg'}
              h={250}
              overflowY={'auto'}
              overflowX={'hidden'}
            >
              <Table variant="simple" size={'sm'}>
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
                        <Button size={'sm'} colorScheme="teal" onClick={onOpen}>
                          <FiEdit />
                        </Button>
                        <Modal isCentered isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent width={80}>
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
                                size={'sm'}
                                selected={update}
                                onSelect={date => {
                                  setUpdate(date);
                                  setUpdateDate(
                                    new Date(date)
                                      .toLocaleDateString()
                                      .replace(/\//g, '-')
                                  );
                                }}
                                peekNextMonth
                                value={update}
                                showMonthDropdown
                                showYearDropdown
                                dateFormat="dd-MM-yyyy"
                                placeholderText={'Select Date'}
                                fixedHeight
                              />
                              <Input
                                size={'sm'}
                                placeholder="Enter Quantity"
                                onChange={newQuantityChange}
                                required
                                textAlign="center"
                              />
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                size={'sm'}
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
                          size={'sm'}
                          onClick={() => {
                            setSelectedsku(val.mastersku);
                            toggleRemove();
                          }}
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
            <Button size={'sm'} mt={2} onClick={downloadFile}>
              Download file
            </Button>
          </AnimatedPage>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default PurchaseReturn;
