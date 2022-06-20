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
  useColorModeValue,
  Box,
  // FormLabel,
  // Text,
  Input,
  Button,
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
  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [skuPerPage] = useState(50);
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

  //   fetch('https://cryptic-bayou-61420.herokuapp.com/api/unmapped/create', {
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
      const response = await fetch(
        'https://cryptic-bayou-61420.herokuapp.com/api/sales/getall'
      );
      const result = await response.json();
      setUnMappedArray(result);
    };
    getUnMapped();
  }, []);
  // get mapped skus with master sku
  const updateUnMappedHandler = async (id, mastersku) => {
    const response = await fetch(
      'https://cryptic-bayou-61420.herokuapp.com/api/sales/updatemapped',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id,
          mastersku: mastersku,
        }),
      }
    );
    const result = await response.json();
    console.log(result);
  };
  // get master skus
  useEffect(() => {
    const masterskuHandler = async () => {
      await fetch('https://cryptic-bayou-61420.herokuapp.com/api/master/getAll')
        .then(res => {
          return res.json();
        })
        .then(data => {
          setmasterskuArray(data);
        });
    };
    masterskuHandler();
    const getSalesList = async () => {
      await fetch('https://cryptic-bayou-61420.herokuapp.com/api/sales/getall')
        .then(res => {
          return res.json();
        })
        .then(data => console.log(data));
    };
    getSalesList();
  }, []);
  // pagination
  const skuRecords = unmappedArray.slice(FirstSKUIndex, LastSKUIndex);
  const skuPages = Math.ceil(unmappedArray.length / skuPerPage);
  return (
    <VStack p={4} pb={120}>
      <Heading size={'lg'} pb={10}>
        Unmapped SKU Section
      </Heading>
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
      <Box>
        <Heading size={'md'} pt={20} pb={4}>
          UnMapped SKU Table
        </Heading>
        <TableContainer
          rounded={'lg'}
          boxShadow={'lg'}
          overflowY={'auto'}
          overflowX={'auto'}
          h={500}
          w={900}
          bg={useColorModeValue('gray.100', 'gray.700')}
        >
          <Table variant="simple">
            <Thead position={'sticky'} top={0} backgroundColor={'lightblue'}>
              <Tr>
                <Th textAlign={'center'}>UnMapped SKUs</Th>
                <Th textAlign={'center'}>Master SKU</Th>
                <Th textAlign={'center'}>Submit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {skuRecords.map(item => (
                <Tr key={item._id}>
                  <Td textAlign={'center'}>{item.SKU}</Td>
                  <Td>
                    <Input
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

      {/* Mapped SKU Table */}
      {/* <Box>
          <Heading size={'md'} pt={20} pb={4}>
            Mapped SKU Table
          </Heading>
          <TableContainer
            rounded={'lg'}
            boxShadow={'lg'}
            overflowY={'auto'}
            overflowX={'auto'}
            h={400}
            bg={useColorModeValue('gray.100', 'gray.700')}
          >
            <Table variant="simple" w={'50%'}>
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
        </Box> */}
    </VStack>
  );
};

export default UnMapped;
