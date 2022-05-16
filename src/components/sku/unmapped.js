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
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

const UnMapped = () => {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
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
    e.preventDefault();

    if (file) {
      fileReader.onload = function (e) {
        const csvOutput = e.target.result;
        console.log(csvOutput);
        csvFileToArray(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <VStack p={4} pb={120}>
      <Heading size={'lg'} pb={10}>
        Unmapped SKU Section
      </Heading>
      <Flex marginLeft={60}>
        <FormLabel
          w={80}
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
      </Flex>

      <Flex gridColumnGap={20}>
        <Box>
          <Heading size={'md'} pt={20} pb={4}>
            UnMapped SKU Table
          </Heading>
          <TableContainer
            rounded={'lg'}
            boxShadow={'lg'}
            overflowY={'auto'}
            overflowX={'scroll'}
            h={400}
            mb={20}
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
        <Box>
          <Heading size={'md'} pt={20} pb={4}>
            Mapped SKU Table
          </Heading>
          <TableContainer
            rounded={'lg'}
            boxShadow={'lg'}
            overflowY={'auto'}
            overflowX={'scroll'}
            h={400}
            mb={20}
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
