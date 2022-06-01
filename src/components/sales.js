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
  Text,
  Spinner,
  FormControl,
  VStack,
  Box,
  Flex,
} from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Sales = () => {
  /*   
    States
 */
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [toggleDate, setToggleDate] = useState(false);
  const [dispatchArray, setIsDispatchArray] = useState([]);
  const [pendingArray, setIsPendingArray] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScan, setIsScan] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [isCancel, setIsCancel] = useState(true);
  const [isDispatch, setIsDispatch] = useState(true);
  const [status, setStatus] = useState('');
  const [enteredAWB, setEnteredAWB] = useState('');
  const fileReader = new FileReader();

  /*
    Event Handlers 
   */
  const onChangeHandler = e => {
    setFile(e.target.files[0]);
  };
  const switchScanHandler = () => {
    if (isScan === true) setIsScan(false);
    if (isDispatch === false) setIsDispatch(true);
    if (isCancel === false) setIsCancel(true);
    if (isPending === false) setIsPending(true);
  };
  const switchDispatchHandler = () => {
    if (isScan === false) setIsScan(true);
    if (isDispatch === true) setIsDispatch(false);
    if (isCancel === false) setIsCancel(true);
    if (isPending === false) setIsPending(true);
  };
  const switchPendingHandler = () => {
    if (isScan === false) setIsScan(true);
    if (isPending === true) setIsPending(false);
    if (isDispatch === false) setIsDispatch(true);
    if (isCancel === false) setIsCancel(true);
  };
  const switchCancelHandler = () => {
    if (isScan === false) setIsScan(true);
    if (isDispatch === false) setIsDispatch(true);
    if (isPending === false) setIsPending(true);
    if (isCancel === true) setIsCancel(false);
  };
  const handleSelect = ranges => {
    console.log(ranges);
  };
  // toggle is done this way
  const toggleDateRange = () => {
    setToggleDate(!toggleDate);
  };

  /* 
    API Action Handlers
  */
  // csv to array conversion
  const csvFileToArray = string => {
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
    fetch('http://localhost:3001/api/sales/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(array),
    });
    console.log(array);
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
  // get the whole data from backend
  const getDataHandler = async () => {
    const recievedData = await fetch('http://localhost:3001/api/sales/getAll');
    const result = await recievedData.json();
    setIsLoading(false);
    setArray(result);
  };
  // update or scan the product with dispatch
  const updateHandler = async e => {
    e.preventDefault();
    await fetch('http://localhost:3001/api/sales/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        awb: enteredAWB,
        status,
      }),
    });
  };
  // filter the product according to AWB
  const filterHandler = async e => {
    e.preventDefault();
    const receivedList = await fetch('http://localhost:3001/api/sales/filter', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        awb: enteredAWB,
      }),
    });
    const result = await receivedList.json();
    setFilterArray(result);
  };
  const dispatchFilter = async () => {
    const receivedList = await fetch(
      'http://localhost:3001/api/sales/dispatchfilter'
    );
    const result = await receivedList.json();
    setIsDispatchArray(result);
  };
  const pendingFilter = async () => {
    const receivedList = await fetch(
      'http://localhost:3001/api/sales/pendingfilter'
    );
    const result = await receivedList.json();
    setIsPendingArray(result);
  };

  /* 
    Hooks
  */
  useEffect(() => {
    getDataHandler();
    dispatchFilter();
    pendingFilter();
  }, []);

  const SelectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  };

  return (
    <VStack p={4} pb={20}>
      <Heading size={'lg'} pb={10}>
        Sales Section
      </Heading>
      <Box textAlign={'center'}>
        <FormControl>
          <FormLabel
            w={'100%'}
            htmlFor={'csvInput'}
            padding={'7px 0px'}
            border={'1px solid grey'}
            _hover={{ cursor: 'pointer' }}
            borderRadius={'5px'}
          >
            <Text textAlign={'center'}>
              Select csv <DownloadIcon />
            </Text>
          </FormLabel>
          <Input
            display={'none'}
            type={'file'}
            id={'csvInput'}
            accept={'.csv'}
            onChange={onChangeHandler}
          />
          <Button
            type={'button'}
            w={'100%'}
            onClick={onSubmitHandler}
            variant={'outline'}
          >
            Import
          </Button>
        </FormControl>
        <Button mt={4} width={'100%'} onClick={toggleDateRange}>
          Date Filter
        </Button>
        {toggleDate ? (
          <DateRangePicker ranges={[SelectionRange]} onChange={handleSelect} />
        ) : null}
        <Flex py={2}>
          <Button onClick={switchScanHandler}>Scan Products</Button>
          <Menu>
            <MenuButton as={Button}>List Products</MenuButton>
            <MenuList>
              <MenuItem onClick={switchDispatchHandler}>Dispatch List</MenuItem>
              <MenuItem onClick={switchPendingHandler}>Pending List</MenuItem>
              <MenuItem onClick={switchCancelHandler}>Full Sales List</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>

      {/* Scan Section */}
      {isDispatch && isCancel && isPending && (
        <Box>
          <form
            onSubmit={e => {
              updateHandler(e);
              filterHandler(e);
            }}
          >
            <Input
              width={'38%'}
              type={'text'}
              mt={5}
              textAlign={'center'}
              onChange={e => {
                setEnteredAWB(e.target.value);
                setStatus('dispatch');
              }}
              placeholder="Enter AWB"
            />
          </form>
          <TableContainer
            pt={10}
            rounded={'lg'}
            boxShadow={'lg'}
            h={400}
            w={1200}
            overflowY={'auto'}
            overflowX={'scroll'}
          >
            <Table variant={'simple'}>
              <Thead>
                <Tr key={'header'}>
                  <Th textAlign={'center'}>AWB</Th>
                  <Th textAlign={'center'}>order id</Th>
                  <Th textAlign={'center'}>SKU</Th>
                  <Th textAlign={'center'}>QTY</Th>
                  <Th textAlign={'center'}>Status</Th>
                  <Th textAlign={'center'}>courier</Th>
                  <Th textAlign={'center'}>date</Th>
                  <Th textAlign={'center'}>firm</Th>
                  <Th textAlign={'center'}>Portal</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filterArray.map(item => (
                  <Tr key={item._id}>
                    <Td>{item.AWB}</Td>
                    <Td>{item.ORDER_ID}</Td>
                    <Td>{item.SKU}</Td>
                    <Td>{item.QTY}</Td>
                    <Td>{item.status}</Td>
                    <Td>{item.courier}</Td>
                    <Td>{item.date}</Td>
                    <Td>{item.firm}</Td>
                    <Td>{item['PORTAL\r']}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Dispatch Section */}
      {isScan && isPending && isCancel && (
        <Box>
          <Heading size={'md'} pt={20} pb={4}>
            Dispatch Table
          </Heading>

          {isLoading && <Spinner size={'xl'} />}
          {!isLoading && (
            <TableContainer
              rounded={'lg'}
              boxShadow={'lg'}
              overflowY={'auto'}
              overflowX={'auto'}
              h={600}
              w={1200}
              mb={20}
            >
              <Table variant="simple">
                <Thead
                  position={'sticky'}
                  top={0}
                  backgroundColor={'lightblue'}
                >
                  <Tr key={'header'}>
                    <Th textAlign={'center'}>AWB</Th>
                    <Th textAlign={'center'}>order id</Th>
                    <Th textAlign={'center'}>SKU</Th>
                    <Th textAlign={'center'}>QTY</Th>
                    <Th textAlign={'center'}>STATUS</Th>
                    <Th textAlign={'center'}>courier</Th>
                    <Th textAlign={'center'}>date</Th>
                    <Th textAlign={'center'}>firm</Th>
                    <Th textAlign={'center'}>Portal</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {dispatchArray.map(item => (
                    <Tr key={item._id}>
                      <Td>{item.AWB}</Td>
                      <Td>{item.ORDER_ID}</Td>
                      <Td>{item.SKU}</Td>
                      <Td>{item.QTY}</Td>
                      <Td>{item.status}</Td>
                      <Td>{item.courier}</Td>
                      <Td>{item.date}</Td>
                      <Td>{item.firm}</Td>
                      <Td>{item['PORTAL\r']}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

      {/* Pending Section */}
      {isScan && isDispatch && isCancel && (
        <Box>
          <Heading size={'md'} pt={20} pb={4}>
            Pending Table
          </Heading>
          {isLoading && <Spinner size={'xl'} />}
          {!isLoading && (
            <TableContainer
              rounded={'lg'}
              boxShadow={'lg'}
              overflowY={'auto'}
              overflowX={'auto'}
              h={600}
              w={1200}
              mb={20}
            >
              <Table variant="simple">
                <Thead
                  position={'sticky'}
                  top={0}
                  backgroundColor={'lightblue'}
                >
                  <Tr key={'header'}>
                    <Th textAlign={'center'}>AWB</Th>
                    <Th textAlign={'center'}>order id</Th>
                    <Th textAlign={'center'}>SKU</Th>
                    <Th textAlign={'center'}>QTY</Th>
                    <Th textAlign={'center'}>STATUS</Th>
                    <Th textAlign={'center'}>courier</Th>
                    <Th textAlign={'center'}>date</Th>
                    <Th textAlign={'center'}>firm</Th>
                    <Th textAlign={'center'}>Portal</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {pendingArray.map(item => (
                    <Tr key={item._id}>
                      <Td>{item.AWB}</Td>
                      <Td>{item.ORDER_ID}</Td>
                      <Td>{item.SKU}</Td>
                      <Td>{item.QTY}</Td>
                      <Td>{item.status}</Td>
                      <Td>{item.courier}</Td>
                      <Td>{item.date}</Td>
                      <Td>{item.firm}</Td>
                      <Td>{item['PORTAL\r']}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

      {/* Cancel Section */}
      {isScan && isDispatch && isPending && (
        <Box>
          <Heading size={'md'} pt={20} pb={4}>
            Full Sales Table
          </Heading>
          {isLoading && <Spinner size={'xl'} />}
          {!isLoading && (
            <TableContainer
              rounded={'lg'}
              boxShadow={'lg'}
              overflowY={'auto'}
              overflowX={'auto'}
              h={600}
              w={1200}
              mb={20}
            >
              <Table variant="simple">
                <Thead
                  position={'sticky'}
                  top={0}
                  backgroundColor={'lightblue'}
                >
                  <Tr key={'header'}>
                    <Th textAlign={'center'}>AWB</Th>
                    <Th textAlign={'center'}>order id</Th>
                    <Th textAlign={'center'}>SKU</Th>
                    <Th textAlign={'center'}>QTY</Th>
                    <Th textAlign={'center'}>STATUS</Th>
                    <Th textAlign={'center'}>courier</Th>
                    <Th textAlign={'center'}>date</Th>
                    <Th textAlign={'center'}>firm</Th>
                    <Th textAlign={'center'}>Portal</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {array.map(item => (
                    <Tr key={item._id}>
                      <Td>{item.AWB}</Td>
                      <Td>{item.ORDER_ID}</Td>
                      <Td>{item.SKU}</Td>
                      <Td>{item.QTY}</Td>
                      <Td>{item.status}</Td>
                      <Td>{item.courier}</Td>
                      <Td>{item.date}</Td>
                      <Td>{item.firm}</Td>
                      <Td>{item['PORTAL\r']}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
    </VStack>
  );
};

export default Sales;
