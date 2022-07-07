import { useState, useEffect } from 'react';
import {
  VStack,
  Heading,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  HStack,
  // FormLabel,
  // Text,
  Input,
  Button,
  Radio,
  RadioGroup,
  InputGroup,
  InputRightAddon,
  // Button,
} from '@chakra-ui/react';
// import { DownloadIcon } from '@chakra-ui/icons';
// files
import Pagination from '../pagination';

const UnMapped = () => {
  // const [file, setFile] = useState();
  const [masterskuArray, setmasterskuArray] = useState([]);
  const [mastersku, setmastersku] = useState('unmapped');
  const [unmappedArray, setUnMappedArray] = useState([]);
  const [isUnmapped, setIsUnMapped] = useState(false);
  const [sku, setSku] = useState('');
  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [skuPerPage] = useState(10);
  const LastSKUIndex = currentPage * skuPerPage;
  const FirstSKUIndex = LastSKUIndex - skuPerPage;

  // const fileReader = new FileReader();
  // const onChangeHandler = e => {
  //   setFile(e.target.files[0]);
  // };
  // const csvFileToArray = string => {
  //   const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
  //   const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');

  //   const array = csvRows.map(i => {
  //     const values = i.split(',');
  //     const obj = csvHeader.reduce((object, header, index) => {
  //       object[header] = values[index];
  //       return object;
  //     }, {});
  //     return obj;
  //   });

  //   fetch('https://shrouded-brushlands-07875.herokuapp.com/api/unmapped/create', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(array),
  //   });
  // };
  // const onSubmitHandler = e => {
  //   if (file) {
  //     fileReader.onload = function (e) {
  //       const csvOutput = e.target.result;
  //       csvFileToArray(csvOutput);
  //     };
  //     fileReader.readAsText(file);
  //   }
  // };
  // get unmapped skus from sales and sales return
  useEffect(() => {
    const getUnMapped = async () => {
      const salesResponse = await fetch(
        'https://shrouded-brushlands-07875.herokuapp.com/api/sales/dispatch',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const salesResult = await salesResponse.json();
      setUnMappedArray(salesResult.groupedData);
      const salesReturnResponse = await fetch(
        'https://shrouded-brushlands-07875.herokuapp.com/api/salesReturn/received',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const salesReturnResult = await salesReturnResponse.json();
      setUnMappedArray([...salesReturnResult.groupedData]);
    };
    getUnMapped();
  }, []);
  const onSearch = async () => {
    const salesResponse = await fetch(
      'https://shrouded-brushlands-07875.herokuapp.com/api/sales/dispatch',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku }),
      }
    );
    const salesresult = await salesResponse.json();
    const salesReturnResponse = await fetch(
      'https://shrouded-brushlands-07875.herokuapp.com/api/salesReturn/received',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku }),
      }
    );
    const salesReturnResult = await salesReturnResponse.json();
    if (salesresult.searchfilterList !== null)
      setUnMappedArray(salesresult.searchfilterList);
    if (salesReturnResult.searchfilterList !== null)
      setUnMappedArray(salesReturnResult.searchfilterList);
  };
  // get mapped skus with master sku
  const updateUnMappedHandler = async (selectedSku, mastersku) => {
    await fetch(
      'https://shrouded-brushlands-07875.herokuapp.com/api/sales/dispatch',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mastersku, selectedSku }),
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => console.log(data));
    await fetch(
      'https://shrouded-brushlands-07875.herokuapp.com/api/salesReturn/received',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mastersku, selectedSku }),
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => console.log(data));
    // group skus into mastersku
    await fetch(
      'https://shrouded-brushlands-07875.herokuapp.com/api/master/groupedsku',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mastersku,
          selectedSku,
        }),
      }
    );
  };
  // get master skus
  useEffect(() => {
    const masterskuHandler = async () => {
      await fetch(
        'https://shrouded-brushlands-07875.herokuapp.com/api/master/getAll'
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          setmasterskuArray(data);
        });
    };
    masterskuHandler();
  }, []);
  // testing

  // pagination
  const skuRecords = unmappedArray.slice(FirstSKUIndex, LastSKUIndex);
  const skuPages = Math.ceil(unmappedArray.length / skuPerPage);
  // testing

  return (
    <VStack>
      <Heading size={'md'} pt={2}>
        Unmapped SKU Section
      </Heading>
      <HStack spacing={40} pt={4}>
        <RadioGroup defaultChecked={'1'}>
          <HStack spacing={4}>
            <Radio
              onChange={() => {
                setIsUnMapped(false);
              }}
              value={'1'}
            >
              UnMapped
            </Radio>
            <Radio
              onChange={() => {
                setIsUnMapped(true);
              }}
              value={'2'}
            >
              Mapped
            </Radio>
          </HStack>
        </RadioGroup>
        <InputGroup size={'sm'}>
          <Input
            size={'sm'}
            placeholder={'Enter SKU'}
            textAlign={'center'}
            borderRadius={6}
            onChange={e => {
              setSku(e.target.value);
            }}
          />
          <InputRightAddon as={Button} onClick={onSearch} borderRadius={6}>
            Search
          </InputRightAddon>
        </InputGroup>
      </HStack>

      {/* <Box textAlign={'center'} width={80}>
        <FormLabel
          width={'100%'}
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
          width={'100%'}
          onClick={() => {
            onSubmitHandler();
            getArrayHandler();
          }}
          variant={'outline'}
        >
          Import
        </Button>
      </Box> */}

      {/* UnMapped SKU Table */}
      {!isUnmapped ? (
        <Box pt={6}>
          <Box>
            <Heading size={'sm'} pb={2}>
              UnMapped SKU Table
            </Heading>
            <TableContainer
              rounded={'lg'}
              boxShadow={'lg'}
              overflowY={'auto'}
              overflowX={'auto'}
              h={280}
              w={900}
              // bg={useColorModeValue('gray.100', 'gray.700')}
            >
              <Table variant="simple" size={'sm'}>
                <Thead
                  position={'sticky'}
                  top={0}
                  backgroundColor={'lightblue'}
                >
                  <Tr>
                    <Th textAlign="center">UnMapped SKUs</Th>
                    <Th textAlign="center">Master SKU</Th>
                    <Th textAlign="center">Submit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {skuRecords.map(item => (
                    <Tr key={item._id}>
                      <Td textAlign={'center'}>{item._id}</Td>
                      <Td>
                        <Input
                          htmlSize={18}
                          width="auto"
                          list={'mastersku'}
                          onChange={e => setmastersku(e.target.value)}
                        />
                        <datalist id={'mastersku'}>
                          {masterskuArray.map(item => (
                            <option key={item._id} value={item.mastersku}>
                              {item.mastersku}
                            </option>
                          ))}
                        </datalist>
                      </Td>
                      <Td>
                        <Button
                          size={'sm'}
                          variant={'outline'}
                          onClick={() => {
                            updateUnMappedHandler(item._id, mastersku);
                          }}
                        >
                          submit
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Pagination
            totalPages={skuPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Box>
      ) : (
        <Box pt={6}>
          <Heading size={'sm'} pb={2}>
            Mapped SKU Table
          </Heading>
          <TableContainer
            rounded={'lg'}
            boxShadow={'lg'}
            overflowY={'auto'}
            overflowX={'auto'}
            h={260}
            width={600}
            // bg={useColorModeValue('gray.100', 'gray.700')}
          >
            <Table variant="simple" size={'sm'}>
              <Thead position={'sticky'} top={0} backgroundColor={'lightblue'}>
                <Tr>
                  <Th textAlign={'center'}>Mapped SKUs</Th>
                  <Th textAlign={'center'}>Master SKUs</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td textAlign={'center'}>test</Td>
                  <Td textAlign={'center'}>test</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Pagination
            totalPages={skuPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Box>
      )}
    </VStack>
  );
};

export default UnMapped;
