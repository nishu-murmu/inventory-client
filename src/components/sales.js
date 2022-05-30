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
  Select,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

const Sales = () => {
  /*   
    States
 */
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScan, setIsScan] = useState(false);
  const [isList, setIsList] = useState(true);
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
    if (isList === false) setIsList(true);
  };
  const switchListHandler = () => {
    if (isScan === false) setIsScan(true);
    if (isList === true) setIsList(false);
  };

  /* 
    API Action Handlers
  */
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
    console.log(array);
    fetch('http://localhost:3001/api/sales/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        array,
      }),
    });
  };
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
  const getDataHandler = async () => {
    const recievedData = await fetch('http://localhost:3001/api/sales/getAll');
    const result = await recievedData.json();
    setIsLoading(false);
    setArray(result);
  };

  const getFilterDataHandler = async e => {
    e.preventDefault();
    setIsLoading(true);
    const recievedFilterData = await fetch(
      'http://localhost:3001/api/sales/filter',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          awb: enteredAWB,
        }),
      }
    );
    const result = await recievedFilterData.json();
    setIsLoading(false);
    setFilterArray(result);
  };
  /* 
    Hooks
  */
  useEffect(() => {
    getDataHandler();
  }, []);

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
        <Flex py={2}>
          <Button onClick={switchScanHandler}>Scan Products</Button>
          <Button onClick={switchListHandler}>List Products</Button>
        </Flex>
      </Box>
      {isScan && (
        <Box>
          <Heading size={'md'} pt={20} pb={4}>
            Sales Table
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
      {isList && (
        <Box>
          <form onSubmit={getFilterDataHandler}>
            <Input
              width={'38%'}
              type={'text'}
              mt={5}
              textAlign={'center'}
              onChange={e => {
                setEnteredAWB(e.target.value);
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
    </VStack>
  );
};

export default Sales;
