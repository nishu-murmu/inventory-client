import { useState, useEffect } from 'react';
import {
  VStack,
  Select,
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
  const [array, setArray] = useState([]);
  const [mappedArray, setMappedArray] = useState([]);
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

    setArray(array);
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

  const masterskuHandler = () => {
    fetch('http://localhost:3001/api/master/getAll')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setMappedArray(data);
      });
  };
  // const headerKeys = Object.keys(Object.assign({}, ...array));

  useEffect(() => {
    masterskuHandler();
  }, []);
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
          onClick={onSubmitHandler}
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
            w={500}
            bg={useColorModeValue('gray.100', 'gray.700')}
          >
            <Table variant="simple">
              <Thead position={'sticky'} top={0} backgroundColor={'lightblue'}>
                <Tr>
                  <Th textAlign={'center'}>UnMapped SKUs</Th>
                  <Th textAlign={'center'}>Master SKU</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>example test</Td>
                  <Td>
                    <Select>
                      {mappedArray.map(item => (
                        <option key={item._id}>{item.mastersku}</option>
                      ))}
                    </Select>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Button my={10} width={'100%'}>
            Submit
          </Button>
        </Box>

        {/* Mapped SKU Table */}
        <Box>
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
                  <Th textAlign={'center'}>UnMapped SKUs</Th>
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
        </Box>
      </Flex>
    </VStack>
  );
};

export default UnMapped;
