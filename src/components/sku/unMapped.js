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
  Flex,
  Box,
  FormLabel,
  Text,
  Input,
  Button,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

const UnMapped = () => {
  const [file, setFile] = useState();
  const [mappedArray, setMappedArray] = useState([]);
  const [unMappedArray, setUnMappedArray] = useState([]);
  const fileReader = new FileReader();

  const onChangeHandler = e => {
    setFile(e.target.files[0]);
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

    fetch('http://localhost:3001/api/unmapped/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(array),
    });
  };

  const onSubmitHandler = e => {
    if (file) {
      fileReader.onload = function (e) {
        const csvOutput = e.target.result;
        csvFileToArray(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };

  const getArrayHandler = async () => {
    await fetch('http://localhost:3001/api/unmapped/getAll')
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        setUnMappedArray(data);
      });
  };

  useEffect(() => {
    const masterskuHandler = async () => {
      await fetch('http://localhost:3001/api/master/getAll')
        .then(res => {
          return res.json();
        })
        .then(data => {
          setMappedArray(data);
        });
    };
    masterskuHandler();
    getArrayHandler();
  });

  return (
    <VStack p={4} pb={120}>
      <Heading size={'lg'} pb={10}>
        Unmapped SKU Section
      </Heading>
      <Box textAlign={'center'} width={80}>
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
      </Box>

      <Flex gridColumnGap={20}>
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
            h={400}
            w={600}
            bg={useColorModeValue('gray.100', 'gray.700')}
          >
            <Table variant="simple">
              <Thead position={'sticky'} top={0} backgroundColor={'lightblue'}>
                <Tr>
                  <Th textAlign={'center'}>UnMapped SKUs</Th>
                  <Th textAlign={'center'}>CATALOG</Th>
                </Tr>
              </Thead>
              <Tbody>
                {unMappedArray.map(item => (
                  <Tr key={item._id}>
                    <Td textAlign={'center'}>{item['STYLE ID']}</Td>
                    <Td textAlign={'center'}>{item['CATALOG ID']}</Td>
                    {/* <Td>
                      <Input list={'mastersku'} autoFocus />
                      <datalist id={'mastersku'}>
                        {mappedArray.map(item => (
                          <option key={item._id}>{item.mastersku}</option>
                        ))}
                      </datalist>
                    </Td> */}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Button my={10} width={'100%'}>
            Submit
          </Button>
        </Box>

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
      </Flex>
    </VStack>
  );
};

export default UnMapped;
