import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Input,
  Text,
  FormLabel,
  Td,
  Heading,
  Button,
  Spinner,
  VStack,
  Flex,
  FormControl,
  Select,
} from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// files

const SalesReturn = () => {
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

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');

    const array = csvRows.map(i => {
      const values = i.split(',');
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    console.log(array);
    fetch('https://cryptic-bayou-61420.herokuapp.com/salesReturn/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(array),
    });
  };

  const onSubmitHandler = e => {
    setIsLoading(true);
    if (file) {
      fileReader.onload = function (e) {
        const csvOutput = e.target.result;
        console.log(csvOutput);
        csvFileToArray(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };
  const getDataHandler = async () => {
    const recievedData = await fetch(
      'https://cryptic-bayou-61420.herokuapp.com/salesReturn/getAll'
    );
    const result = await recievedData.json();
    setIsLoading(false);
    setArray(result);
  };
  const updateHandler = async e => {
    e.preventDefault();
    await fetch(
      'https://cryptic-bayou-61420.herokuapp.com/salesReturn/update',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          awb: enteredAWB,
          status,
        }),
      }
    );
  };

  const filterHandler = async e => {
    e.preventDefault();
    const receivedList = await fetch(
      'https://cryptic-bayou-61420.herokuapp.com/salesReturn/filter',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          awb: enteredAWB,
        }),
      }
    );
    const result = await receivedList.json();
    setFilterArray(result);
  };
  const dispatchFilter = async () => {
    const receivedList = await fetch(
      'https://cryptic-bayou-61420.herokuapp.com/salesReturn/dispatchfilter'
    );
    const result = await receivedList.json();
    setIsDispatchArray(result);
  };
  const pendingFilter = async () => {
    const receivedList = await fetch(
      'https://cryptic-bayou-61420.herokuapp.com/salesReturn/pendingfilter'
    );
    const result = await receivedList.json();
    setIsPendingArray(result);
  };
  const SelectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  };
  /* 
    Hooks
  */
  useEffect(() => {
    getDataHandler();
    dispatchFilter();
    pendingFilter();
  }, []);

  return (
    <VStack p={4} pb={20}>
      <Heading size={'lg'} pb={10}>
        Sales Return Section
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
                  <Th textAlign={'center'}>Suborder ID</Th>
                  <Th textAlign={'center'}>Order ID</Th>
                  <Th textAlign={'center'}>AWB</Th>
                  <Th textAlign={'center'}>SKU</Th>
                  <Th textAlign={'center'}>QTY</Th>
                  <Th textAlign={'center'}>Status</Th>
                  <Th textAlign={'center'}>Return Received Date</Th>
                  <Th textAlign={'center'}>WRONG RETURN</Th>
                  <Th textAlign={'center'}>Return Request Date</Th>
                  <Th textAlign={'center'}>
                    Return Delivered Date As Per Website
                  </Th>
                  <Th textAlign={'center'}>Portal</Th>
                  <Th textAlign={'center'}>Return Type Web</Th>
                  <Th textAlign={'center'}>Company</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filterArray.map(item => (
                  <Tr key={item._id}>
                    <Td textAlign={'center'}>{item['Suborder ID']}</Td>
                    <Td textAlign={'center'}>{item['Order ID']}</Td>
                    <Td textAlign={'center'}>{item['AWB NO']}</Td>
                    <Td textAlign={'center'}>{item.SKU}</Td>
                    <Td textAlign={'center'}>{item.QTY}</Td>
                    <Td mr={10}>
                      <Select
                        defaultValue={'dispatch'}
                        mx={10}
                        onChange={e => {
                          setStatus(e.target.value);
                        }}
                      >
                        <option value={'pending'}>pending</option>
                        <option value={'dispatch'}>dispatch</option>
                        <option value={'cancel'}>cancel</option>
                      </Select>
                    </Td>
                    <Td textAlign={'center'}>{item['Return Received Date']}</Td>
                    <Td textAlign={'center'}>{item['WRONG RETURN']}</Td>
                    <Td textAlign={'center'}>{item['Return Request Date']}</Td>
                    <Td textAlign={'center'}>
                      {item['Return Delivered Date As Per Website']}
                    </Td>
                    <Td textAlign={'center'}>{item.Portal}</Td>
                    <Td textAlign={'center'}>{item['RETURN TYPE WEB']}</Td>
                    <Td textAlign={'center'}>{item['COMPANY\r']}</Td>
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
              h={400}
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
                    <Th textAlign={'center'}>Suborder ID</Th>
                    <Th textAlign={'center'}>Order ID</Th>
                    <Th textAlign={'center'}>AWB</Th>
                    <Th textAlign={'center'}>SKU</Th>
                    <Th textAlign={'center'}>QTY</Th>
                    <Th textAlign={'center'}>Return Received Date</Th>
                    <Th textAlign={'center'}>WRONG RETURN</Th>
                    <Th textAlign={'center'}>Return Request Date</Th>
                    <Th textAlign={'center'}>
                      Return Delivered Date As Per Website
                    </Th>
                    <Th textAlign={'center'}>Portal</Th>
                    <Th textAlign={'center'}>Return Type Web</Th>
                    <Th textAlign={'center'}>Company</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {dispatchArray.map(item => (
                    <Tr key={item._id}>
                      <Td textAlign={'center'}>{item['Suborder ID']}</Td>
                      <Td textAlign={'center'}>{item['Order ID']}</Td>
                      <Td textAlign={'center'}>{item['AWB NO']}</Td>
                      <Td textAlign={'center'}>{item.SKU}</Td>
                      <Td textAlign={'center'}>{item.QTY}</Td>
                      <Td textAlign={'center'}>
                        {item['Return Received Date']}
                      </Td>
                      <Td textAlign={'center'}>{item['WRONG RETURN']}</Td>
                      <Td textAlign={'center'}>
                        {item['Return Request Date']}
                      </Td>
                      <Td textAlign={'center'}>
                        {item['Return Delivered Date As Per Website']}
                      </Td>
                      <Td textAlign={'center'}>{item.Portal}</Td>
                      <Td textAlign={'center'}>{item['RETURN TYPE WEB']}</Td>
                      <Td textAlign={'center'}>{item['COMPANY\r']}</Td>
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
            Dispatch Table
          </Heading>
          {isLoading && <Spinner size={'xl'} />}
          {!isLoading && (
            <TableContainer
              rounded={'lg'}
              boxShadow={'lg'}
              overflowY={'auto'}
              overflowX={'auto'}
              h={400}
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
                    <Th textAlign={'center'}>Suborder ID</Th>
                    <Th textAlign={'center'}>Order ID</Th>
                    <Th textAlign={'center'}>AWB</Th>
                    <Th textAlign={'center'}>SKU</Th>
                    <Th textAlign={'center'}>QTY</Th>
                    <Th textAlign={'center'}>Return Received Date</Th>
                    <Th textAlign={'center'}>WRONG RETURN</Th>
                    <Th textAlign={'center'}>Return Request Date</Th>
                    <Th textAlign={'center'}>
                      Return Delivered Date As Per Website
                    </Th>
                    <Th textAlign={'center'}>Portal</Th>
                    <Th textAlign={'center'}>Return Type Web</Th>
                    <Th textAlign={'center'}>Company</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {pendingArray.map(item => (
                    <Tr key={item._id}>
                      <Td textAlign={'center'}>{item['Suborder ID']}</Td>
                      <Td textAlign={'center'}>{item['Order ID']}</Td>
                      <Td textAlign={'center'}>{item['AWB NO']}</Td>
                      <Td textAlign={'center'}>{item.SKU}</Td>
                      <Td textAlign={'center'}>{item.QTY}</Td>
                      <Td textAlign={'center'}>
                        {item['Return Received Date']}
                      </Td>
                      <Td textAlign={'center'}>{item['WRONG RETURN']}</Td>
                      <Td textAlign={'center'}>
                        {item['Return Request Date']}
                      </Td>
                      <Td textAlign={'center'}>
                        {item['Return Delivered Date As Per Website']}
                      </Td>
                      <Td textAlign={'center'}>{item.Portal}</Td>
                      <Td textAlign={'center'}>{item['RETURN TYPE WEB']}</Td>
                      <Td textAlign={'center'}>{item['COMPANY\r']}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
      {/* Full List Section */}
      {isScan && isDispatch && isPending && (
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
              h={400}
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
                    <Th textAlign={'center'}>Suborder ID</Th>
                    <Th textAlign={'center'}>Order ID</Th>
                    <Th textAlign={'center'}>AWB</Th>
                    <Th textAlign={'center'}>SKU</Th>
                    <Th textAlign={'center'}>QTY</Th>
                    <Th textAlign={'center'}>Return Received Date</Th>
                    <Th textAlign={'center'}>WRONG RETURN</Th>
                    <Th textAlign={'center'}>Return Request Date</Th>
                    <Th textAlign={'center'}>
                      Return Delivered Date As Per Website
                    </Th>
                    <Th textAlign={'center'}>Portal</Th>
                    <Th textAlign={'center'}>Return Type Web</Th>
                    <Th textAlign={'center'}>Company</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {array.map(item => (
                    <Tr key={item._id}>
                      <Td textAlign={'center'}>{item['Suborder ID']}</Td>
                      <Td textAlign={'center'}>{item['Order ID']}</Td>
                      <Td textAlign={'center'}>{item['AWB NO']}</Td>
                      <Td textAlign={'center'}>{item.SKU}</Td>
                      <Td textAlign={'center'}>{item.QTY}</Td>
                      <Td textAlign={'center'}>
                        {item['Return Received Date']}
                      </Td>
                      <Td textAlign={'center'}>{item['WRONG RETURN']}</Td>
                      <Td textAlign={'center'}>
                        {item['Return Request Date']}
                      </Td>
                      <Td textAlign={'center'}>
                        {item['Return Delivered Date As Per Website']}
                      </Td>
                      <Td textAlign={'center'}>{item.Portal}</Td>
                      <Td textAlign={'center'}>{item['RETURN TYPE WEB']}</Td>
                      <Td textAlign={'center'}>{item['COMPANY\r']}</Td>
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

export default SalesReturn;
