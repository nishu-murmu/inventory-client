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
import { DownloadIcon } from '@chakra-ui/icons';
// files

const SalesReturn = () => {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScan, setIsScan] = useState(false);
  const [isList, setIsList] = useState(true);
  const [status, setStatus] = useState('');
  const [enteredAWB, setEnteredAWB] = useState('');
  const fileReader = new FileReader();

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
    fetch('http://localhost:3001/api/salesReturn/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        array,
      }),
    });
  };

  const onSubmitHandler = e => {
    // e.preventDefault();
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
      'http://localhost:3001/api/salesReturn/getSalesReturn'
    );
    const result = await recievedData.json();
    setIsLoading(false);
    setArray(result);
  };
  const getFilterDataHandler = async e => {
    e.preventDefault();
    setIsLoading(true);
    const recievedFilterData = await fetch(
      'http://localhost:3001/api/salesReturn/filter',
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
    console.log(result);
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
        <Flex py={2}>
          <Button onClick={switchScanHandler}>Scan Products</Button>
          <Button onClick={switchListHandler}>List Products</Button>
        </Flex>
      </Box>
      {isScan && (
        <Box>
          <Heading size={'md'} pt={20} pb={4}>
            Sales Return Table
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
                        mx={10}
                        onChange={e => {
                          setStatus(e.target.value);
                        }}
                      >
                        <option selected>pending</option>
                        <option>dispatch</option>
                        <option>cancel</option>
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
    </VStack>
  );
};

export default SalesReturn;
