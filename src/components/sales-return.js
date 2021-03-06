import { useState, useEffect } from 'react';
import {
  Input,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  FormLabel,
  Button,
  Spinner,
  HStack,
  VStack,
  Box,
  InputGroup,
  Select,
  useDisclosure,
  InputRightAddon,
  FormControl,
} from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalBody, ModalContent } from '@chakra-ui/react';

import { DownloadIcon } from '@chakra-ui/icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { saveAs } from 'file-saver';
// files
import Pagination from './pagination';

const Sales = () => {
  // states
  const [file, setFile] = useState();
  const fileReader = new FileReader();
  const [isLoading, setIsLoading] = useState(false);
  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const LastProductIndex = currentPage * productsPerPage;
  const FirstProductIndex = LastProductIndex - productsPerPage;
  // scanning states
  const [status, setStatus] = useState('received');
  const [enteredAWB, setEnteredAWB] = useState('');
  // date filter states
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // filter states
  const [receivedCount, setReceivedCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [partialCount, setPartialCount] = useState(0);

  const [receivedArray, setReceivedArray] = useState([]);
  const [wrongArray, setWrongArray] = useState([]);
  const [partialArray, setPartialArray] = useState([]);
  const [filterArray, setFilterArray] = useState([]);

  const [isScan, setIsScan] = useState(false);
  const [isReceived, setIsReceived] = useState(true);
  const [isPartial, setIsPartial] = useState(true);
  const [isWrong, setIsWrong] = useState(true);
  // Event Handlers
  const onChangeHandler = e => {
    setFile(e.target.files[0]);
  };
  const switchScanHandler = () => {
    if (isScan === true) setIsScan(false);
    if (isReceived === false) setIsReceived(true);
    if (isWrong === false) setIsWrong(true);
    if (isPartial === false) setIsPartial(true);
  };
  const switchReceivedHandler = () => {
    if (isScan === false) setIsScan(true);
    if (isReceived === true) setIsReceived(false);
    if (isWrong === false) setIsWrong(true);
    if (isPartial === false) setIsPartial(true);
  };
  const switchPartialHandler = () => {
    if (isScan === false) setIsScan(true);
    if (isPartial === true) setIsPartial(false);
    if (isReceived === false) setIsReceived(true);
    if (isWrong === false) setIsWrong(true);
  };
  const switchWrongHandler = () => {
    if (isScan === false) setIsScan(true);
    if (isReceived === false) setIsReceived(true);
    if (isPartial === false) setIsPartial(true);
    if (isWrong === true) setIsWrong(false);
  };
  // csv to array conversion
  const csvFileToArray = async string => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');
    const array = csvRows.map(i => {
      const values = i.split(',') || i.split(' ');
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    await fetch(
      'https://shrouded-brushlands-07875.herokuapp.com/api/salesReturn/create',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(array),
      }
    );
    // await fetch('https://shrouded-brushlands-07875.herokuapp.com/api/salesReturn/bulkupdate', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(array),
    // });
    // console.log(array);
  };
  // submit csv file to function
  const onSubmitHandler = e => {
    setIsLoading(true);
    if (file) {
      fileReader.onload = function (e) {
        const csvOutput = e.target.result;
        csvFileToArray(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };
  // update product using AWB to received
  useEffect(() => {
    const updateHandler = async () => {
      const response = await fetch(
        'https://shrouded-brushlands-07875.herokuapp.com/api/salesReturn/update',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            awb: enteredAWB,
            status,
            date: new Date().toLocaleDateString().replace(/\//g, '-'),
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      setFilterArray(result);
    };
    updateHandler();
  }, [status, enteredAWB]);
  // universal filters
  useEffect(() => {
    const receivedfilter = async filter => {
      setIsLoading(true);
      const response = await fetch(
        'https://shrouded-brushlands-07875.herokuapp.com/api/salesReturn/filter',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filter: filter,
            sd: startDate.toLocaleDateString().replace(/\//g, '-'),
            ed: endDate.toLocaleDateString().replace(/\//g, '-'),
          }),
        }
      );
      const result = await response.json();
      setIsLoading(false);
      setReceivedCount(result.filterList.length);
      setReceivedArray(result.filterList);
    };
    receivedfilter('received');
    const partialfilter = async filter => {
      setIsLoading(true);
      const response = await fetch(
        'https://shrouded-brushlands-07875.herokuapp.com/api/salesReturn/filter',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filter: filter,
            sd: startDate.toLocaleDateString().replace(/\//g, '-'),
            ed: endDate.toLocaleDateString().replace(/\//g, '-'),
          }),
        }
      );
      const result = await response.json();
      setIsLoading(false);
      setPartialArray(result.filterList);
      setPartialCount(result.filterList.length);
    };
    partialfilter('partial');
    const wrongfilter = async filter => {
      setIsLoading(true);
      const response = await fetch(
        'https://shrouded-brushlands-07875.herokuapp.com/api/salesReturn/filter',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filter: filter,
            sd: startDate.toLocaleDateString().replace(/\//g, '-'),
            ed: endDate.toLocaleDateString().replace(/\//g, '-'),
          }),
        }
      );
      const result = await response.json();
      setIsLoading(false);
      setWrongCount(result.filterList.length);
      setWrongArray(result.filterList);
    };
    wrongfilter('wrong');
  }, [startDate, endDate]);
  // Date filter
  const SelectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };
  const handleSelect = ranges => {
    setEndDate(ranges.selection.endDate);
    setStartDate(ranges.selection.startDate);
  };
  // Searching filter
  const onSearch = async status => {
    const response = await fetch(
      'https://shrouded-brushlands-07875.herokuapp.com/api/salesReturn/filter',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enteredAWB,
          status,
        }),
      }
    );
    const result = await response.json();
    if (status === 'received') {
      setReceivedArray(result.searchfilterList);
      setReceivedCount(result.searchfilterList.length);
    }
    if (status === 'partial') {
      setPartialArray(result.searchfilterList);
      setPartialCount(result.searchfilterList.length);
    }
    if (status === 'wrong') {
      setWrongArray(result.searchfilterList);
      setWrongCount(result.searchfilterList.length);
    }
  };
  // removing duplicates
  const removeDups = async () => {
    const response = await fetch(
      'https://shrouded-brushlands-07875.herokuapp.com/api/salesReturn/grouped'
    );
    await response.json();
  };
  // pagination
  const { isOpen, onOpen, onClose } = useDisclosure();
  const receivedRecords = receivedArray.slice(
    FirstProductIndex,
    LastProductIndex
  );
  const receivedpages = Math.ceil(receivedArray.length / productsPerPage);
  const partialRecords = partialArray.slice(
    FirstProductIndex,
    LastProductIndex
  );
  const partialpages = Math.ceil(partialArray.length / productsPerPage);
  const wrongRecords = wrongArray.slice(FirstProductIndex, LastProductIndex);
  const wrongpages = Math.ceil(Array.length / productsPerPage);
  const downloadFile = (array, status) => {
    const csv = array
      .map(item => {
        return JSON.stringify(item);
      })
      .join('\n')
      .replace(/(^\[)|(\]$)/gm, '');
    const blob = new Blob([csv], {
      type: 'text/plain;charset=utf-8',
    });
    if (status === 'received') saveAs(blob, 'received.csv');
    if (status === 'partial') saveAs(blob, 'partial.csv');
    if (status === 'wrong') saveAs(blob, 'wrong.csv');
  };
  return (
    <VStack>
      <Heading as={'h2'} size={'md'} mt={4}>
        Sales Return Section
      </Heading>
      {!isScan && (
        <HStack spacing={80}>
          {/* VStack 2 */}
          <VStack>
            <HStack spacing={2}>
              <Button size={'sm'} onClick={switchScanHandler}>
                Scan Products
              </Button>
              <Menu size={'sm'}>
                <MenuButton size={'sm'} as={Button}>
                  List Products
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={switchReceivedHandler}>
                    Received List
                  </MenuItem>
                  <MenuItem onClick={switchPartialHandler}>
                    Partial List
                  </MenuItem>
                  <MenuItem onClick={switchWrongHandler}>Wrong List</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            <Input
              size={'sm'}
              borderRadius={6}
              type={'text'}
              mt={5}
              textAlign={'center'}
              onChange={e => {
                setEnteredAWB(e.target.value);
                setStatus('received');
                e.target.select();
              }}
              value={enteredAWB}
              placeholder="Enter AWB"
              autoFocus
              autoCapitalize="true"
            />
          </VStack>
          {/* VStack 1 */}
          <VStack>
            <InputGroup size={'sm'}>
              <FormLabel
                width={'100%'}
                htmlFor={'csvInput'}
                _hover={{ cursor: 'pointer' }}
                textAlign={'center'}
              >
                Upload File
              </FormLabel>
              <Input
                display={'none'}
                type={'file'}
                id={'csvInput'}
                accept={'.csv'}
                onChange={onChangeHandler}
              />
              <InputRightAddon
                type={'button'}
                variant={'outline'}
                children={'Select csv'}
                _hover={{ cursor: 'pointer' }}
                onClick={onSubmitHandler}
              >
                Import
                <DownloadIcon ml={1} mt={1} />
              </InputRightAddon>
            </InputGroup>
            <InputGroup size={'sm'}>
              <FormControl>
                <FormLabel
                  htmlFor="bulk"
                  width={'100%'}
                  _hover={{ cursor: 'pointer' }}
                  textAlign="center"
                  borderRadius={'5px'}
                >
                  Upload for Bulk Scan
                </FormLabel>
                <Input
                  borderRadius={6}
                  id={'bulk'}
                  accept={'. csv'}
                  display="none"
                  type={'file'}
                  onChange={onChangeHandler}
                />
              </FormControl>
              <InputRightAddon
                type={'button'}
                _hover={{ cursor: 'pointer' }}
                variant={'outline'}
                children={'Select csv'}
                onClick={onSubmitHandler}
              >
                Import <DownloadIcon ml={1} mt={1} />
              </InputRightAddon>
            </InputGroup>
          </VStack>
        </HStack>
      )}
      {isScan && (
        <HStack spacing={40}>
          {/* VStack 2 */}
          <VStack>
            <HStack spacing={2}>
              <Button size={'sm'} onClick={switchScanHandler}>
                Scan Products
              </Button>
              <Menu size={'sm'}>
                <MenuButton size={'sm'} as={Button}>
                  List Products
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={switchReceivedHandler}>
                    Received List
                  </MenuItem>
                  <MenuItem onClick={switchPartialHandler}>
                    Partial List
                  </MenuItem>
                  <MenuItem onClick={switchWrongHandler}>Wrong List</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            {isScan && (
              <Button
                width={'100%'}
                size={'sm'}
                onClick={() => {
                  if (!isReceived) downloadFile(receivedArray, 'received');
                  if (!isPartial) downloadFile(partialArray, 'partial');
                  if (!isWrong) downloadFile(wrongArray, 'wrong');
                }}
              >
                Download file
              </Button>
            )}
          </VStack>
          {/* VStack 3 */}
          <VStack>
            <Button width={'100%'} size={'sm'} onClick={onOpen}>
              Date Filter
            </Button>
            <Button width={'100%'} size={'sm'} onClick={removeDups}>
              Remove
            </Button>
            <Modal size={'sm'} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody>
                  <DateRange
                    ranges={[SelectionRange]}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection
                    retainEndDateOnFirstSelection
                    maxDate={new Date()}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </VStack>
          {/* VStack 4 */}
          <VStack>
            <InputGroup size={'sm'}>
              <Input
                borderRadius={6}
                size={'sm'}
                type={'text'}
                textAlign={'center'}
                placeholder={'Enter SKU'}
                value={enteredAWB}
                autoFocus
                onChange={e => {
                  setEnteredAWB(e.target.value);
                }}
              />
              {!isReceived ? (
                <InputRightAddon
                  onClick={() => {
                    onSearch('received');
                  }}
                  borderRadius={6}
                  as={Button}
                >
                  Search
                </InputRightAddon>
              ) : !isPartial ? (
                <InputRightAddon
                  onClick={() => {
                    onSearch('partial');
                  }}
                  borderRadius={6}
                  as={Button}
                >
                  Search
                </InputRightAddon>
              ) : !isWrong ? (
                <InputRightAddon
                  onClick={() => {
                    onSearch('wrong');
                  }}
                  borderRadius={6}
                  as={Button}
                >
                  Search
                </InputRightAddon>
              ) : (
                alert('something wrong')
              )}
            </InputGroup>
            <Button size={'sm'} width={'100%'} px={20} variant={'outline'}>
              {!isReceived
                ? `${receivedCount}`
                : !isPartial
                ? `${partialCount}`
                : !isWrong
                ? `${wrongCount}`
                : '0'}
            </Button>
          </VStack>
        </HStack>
      )}
      {/* Scan Section */}
      {!isScan && (
        <Box width={'auto'}>
          {filterArray === null ? (
            <Box mt={20}>Enter AWB for scan</Box>
          ) : (
            <TableContainer
              rounded={'lg'}
              boxShadow={'lg'}
              h={260}
              w={1200}
              overflowY={'auto'}
              overflowX={'scroll'}
            >
              <Table variant={'simple'} size={'sm'}>
                <Thead>
                  <Tr key={'header'}>
                    <Th textAlign={'center'}>AWB</Th>
                    <Th textAlign={'center'}>SubOrder Id</Th>
                    <Th textAlign={'center'}>order id</Th>
                    <Th textAlign={'center'}>SKU</Th>
                    <Th textAlign={'center'}>Master SKU</Th>
                    <Th textAlign={'center'}>QTY</Th>
                    <Th textAlign={'center'}>STATUS</Th>
                    <Th textAlign={'center'}>Return Received Date</Th>
                    <Th textAlign={'center'}>Return Request Date</Th>
                    <Th textAlign={'center'}>
                      Return Delivered Date As Per Website
                    </Th>
                    <Th textAlign={'center'}>Portal</Th>
                    <Th textAlign={'center'}>Wrong Return</Th>
                    <Th textAlign={'center'}>Return Type Web</Th>
                    <Th textAlign={'center'}>Company</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    <Tr key={filterArray.AWB}>
                      <Td>{filterArray['AWB NO']}</Td>
                      <Td>{filterArray['Suborder ID']}</Td>
                      <Td>{filterArray['Order ID']}</Td>
                      <Td>{filterArray.SKU}</Td>
                      <Td>{filterArray.mastersku}</Td>
                      <Td>{filterArray.QTY}</Td>
                      <Td>
                        <Select
                          textAlign={'center'}
                          size={'sm'}
                          borderRadius={6}
                          onChange={e => {
                            setStatus(e.target.value);
                          }}
                          value={status}
                          mx={'40px'}
                        >
                          <option value={'received'}>received</option>
                          <option value={'partial'}>partial</option>
                          <option value={'wrong'}>wrong</option>
                        </Select>
                      </Td>
                      <Td>{filterArray['Return Received Date']}</Td>
                      <Td>{filterArray['Return Request Date']}</Td>
                      <Td>
                        {filterArray['Return Delivered Date As Per Website']}
                      </Td>
                      <Td>{filterArray.Portal}</Td>
                      <Td>{filterArray['WRONG RETURN']}</Td>
                      <Td>{filterArray['RETURN TYPE WEB']}</Td>
                      <Td>{filterArray['COMPANY\r']}</Td>
                    </Tr>
                  }
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
      {/* Filters Section */}
      {isScan && (
        <Box>
          <Heading size={'sm'} py={2}>
            {!isReceived
              ? 'received Table'
              : !isPartial
              ? 'partial Table'
              : !isWrong
              ? 'wrong Table'
              : ''}
          </Heading>

          {isLoading && <Spinner mt={20} size={'md'} />}
          {!isLoading && (
            <VStack mb={2}>
              <TableContainer
                rounded={'lg'}
                boxShadow={'lg'}
                overflowY={'auto'}
                overflowX={'auto'}
                h={260}
                w={1200}
              >
                <Table variant="striped" size={'sm'}>
                  <Thead
                    position={'sticky'}
                    top={0}
                    backgroundColor={'lightblue'}
                  >
                    <Tr key={'header'}>
                      <Th textAlign={'center'}>AWB</Th>
                      <Th textAlign={'center'}>SubOrder Id</Th>
                      <Th textAlign={'center'}>order id</Th>
                      <Th textAlign={'center'}>SKU</Th>
                      <Th textAlign={'center'}>Master SKU</Th>
                      <Th textAlign={'center'}>QTY</Th>
                      <Th textAlign={'center'}>STATUS</Th>
                      <Th textAlign={'center'}>Return Received Date</Th>
                      <Th textAlign={'center'}>Return Request Date</Th>
                      <Th textAlign={'center'}>
                        Return Delivered Date As Per Website
                      </Th>
                      <Th textAlign={'center'}>Portal</Th>
                      <Th textAlign={'center'}>Wrong Return</Th>
                      <Th textAlign={'center'}>Return Type Web</Th>
                      <Th textAlign={'center'}>Company</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {!isReceived ? (
                      receivedRecords.map(item => (
                        <Tr key={item._id}>
                          <Td>{item['AWB NO']}</Td>
                          <Td>{item['Suborder ID']}</Td>
                          <Td>{item['Order ID']}</Td>
                          <Td>{item.SKU}</Td>
                          <Td>{item.mastersku}</Td>
                          <Td>{item.QTY}</Td>
                          <Td>{item.status}</Td>
                          <Td>{item['Return Received Date']}</Td>
                          <Td>{item['Return Request Date']}</Td>
                          <Td>
                            {item['Return Delivered Date As Per Website']}
                          </Td>
                          <Td>{item.Portal}</Td>
                          <Td>{item['WRONG RETURN']}</Td>
                          <Td>{item['RETURN TYPE WEB']}</Td>
                          <Td>{item['COMPANY\r']}</Td>
                        </Tr>
                      ))
                    ) : !isPartial ? (
                      partialRecords.map(item => (
                        <Tr key={item._id}>
                          <Td>{item['AWB NO']}</Td>
                          <Td>{item['Suborder ID']}</Td>
                          <Td>{item['Order ID']}</Td>
                          <Td>{item.SKU}</Td>
                          <Td>{item.mastersku}</Td>
                          <Td>{item.QTY}</Td>
                          <Td>{item.status}</Td>
                          <Td>{item['Return Received Date']}</Td>
                          <Td>{item['Return Request Date']}</Td>
                          <Td>
                            {item['Return Delivered Date As Per Website']}
                          </Td>
                          <Td>{item.Portal}</Td>
                          <Td>{item['WRONG RETURN']}</Td>
                          <Td>{item['RETURN TYPE WEB']}</Td>
                          <Td>{item['COMPANY\r']}</Td>
                        </Tr>
                      ))
                    ) : !isWrong ? (
                      wrongRecords.map(item => (
                        <Tr key={item._id}>
                          <Td>{item['AWB NO']}</Td>
                          <Td>{item['Suborder ID']}</Td>
                          <Td>{item['Order ID']}</Td>
                          <Td>{item.SKU}</Td>
                          <Td>{item.mastersku}</Td>
                          <Td>{item.QTY}</Td>
                          <Td>{item.status}</Td>
                          <Td>{item['Return Received Date']}</Td>
                          <Td>{item['Return Request Date']}</Td>
                          <Td>
                            {item['Return Delivered Date As Per Website']}
                          </Td>
                          <Td>{item.Portal}</Td>
                          <Td>{item['WRONG RETURN']}</Td>
                          <Td>{item['RETURN TYPE WEB']}</Td>
                          <Td>{item['COMPANY\r']}</Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td>Error</Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          )}
          {!isReceived ? (
            <Pagination
              totalPages={receivedpages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : !isPartial ? (
            <Pagination
              totalPages={partialpages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : !isWrong ? (
            <Pagination
              totalPages={wrongpages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            <Box>Error</Box>
          )}
        </Box>
      )}
    </VStack>
  );
};
export default Sales;
