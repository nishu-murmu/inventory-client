import { useState } from 'react';
import {
  Box,
  Heading,
  Table,
  FormLabel,
  Text,
  Input,
  Button,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

const Mapped = () => {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(false);
    setArray(array);
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

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <VStack p={4}>
      <Heading size={'lg'} pb={10}>
        Master SKU Section
      </Heading>
      <Box textAlign={'center'} w={80}>
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
      <Heading size={'md'} pt={20} pb={4}>
        Master SKU Table
      </Heading>
      {isLoading && <Spinner size={'xl'} />}
      {!isLoading && (
        <TableContainer
          rounded={'lg'}
          boxShadow={'lg'}
          overflowY={'auto'}
          overflowX={'auto'}
          h={400}
          w={800}
          mb={20}
        >
          <Table variant="simple">
            <Thead position={'sticky'} top={0} backgroundColor={'lightblue'}>
              <Tr key={'header'}>
                {headerKeys.map(key => (
                  <Th textAlign={'center'}>{key}</Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {array.map(item => (
                <Tr key={item.id}>
                  {Object.values(item).map(val => (
                    <Td textAlign={'center'}>{val}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </VStack>
  );
};

export default Mapped;
