import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Button,
  Th,
  Td,
  Heading,
  useColorModeValue,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputRightAddon,
  FormLabel,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
// files

const LiveStock = () => {
  // const nav = useNavigate();
  const [file, setFile] = useState();
  const fileReader = new FileReader();
  const [mergedArray, setMergedArray] = useState([]);
  const [livestockArray, setLiveStockArray] = useState([]);
  // event handlers
  const onChangeHandler = e => {
    setFile(e.target.files[0]);
  };
  // get the merged List
  useEffect(() => {
    const mergedData = async () => {
      const response = await fetch(
        'https://shrouded-brushlands-07875.herokuapp.com/api/master/merged'
      );
      const result = await response.json(response);
      setLiveStockArray(result);
    };
    mergedData();
  }, []);
  // perform calculations and store it in backend
  const deleteList = async () => {
    await fetch(
      'https://shrouded-brushlands-07875.herokuapp.com/api/livestock/delete',
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  };
  const sendMergedArray = async () => {
    livestockArray.map(item =>
      fetch(
        'https://shrouded-brushlands-07875.herokuapp.com/api/livestock/create',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mastersku: item.mastersku,
            purchase:
              item.purchase.length === 0 ? 0 : item.purchase[0].quantity,
            purchaseReturn:
              item.purchaseReturn.length === 0
                ? 0
                : item.purchaseReturn[0].quantity,
            sales: item.sales.length === 0 ? 0 : item.sales[0].QTY,
            salesReturn:
              item.salesreturn.length === 0 ? 0 : item.salesReturn[0].QTY,
            skus: item.skus,
          }),
        }
      )
    );
  };
  // receive final livestock after calculations
  useEffect(() => {
    const finalLiveStock = async () => {
      const response = await fetch(
        'https://shrouded-brushlands-07875.herokuapp.com/api/livestock/getAll'
      );
      const result = await response.json();
      setMergedArray(result);
    };
    finalLiveStock();
  }, []);
  useEffect(() => {
    const salesmaster = async () => {
      const response = await fetch(
        'http://localhost:3001/api/master/mastersku'
      );
      const result = await response.json();
      console.log(result);
    };
    salesmaster();
  }, []);
  // csv to array conversion
  const csvFileToArray = async string => {
    console.log(string);
    const csvHeader = string.slice(0, string.indexOf('\r')).split(',');
    const csvRows = string
      .slice(string.indexOf('\r') + 1)
      .split(/(\r\n|\n|\r)/gm);
    const array = csvRows.map(i => {
      const values = i.split(',') || i.split(' ');
      const obj = csvHeader.reduce((object, header, index) => {
        if (values.length > 1) {
          index === 1
            ? (object[header] = parseInt(values[index]))
            : (object[header] = values[index]);
          return object;
        }
        return null;
      }, {});
      return obj;
    });
    const finalArray = array.filter(item => item !== null);
    console.log(finalArray);
    await fetch(
      'https://shrouded-brushlands-07875.herokuapp.com/api/livestock/upload',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalArray),
      }
    );
  };
  // submit csv file to function
  const onSubmitHandler = e => {
    if (file) {
      fileReader.onload = function (e) {
        const csvOutput = e.target.result;
        csvFileToArray(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };
  const downloadFile = () => {
    const csv = mergedArray
      .map(item => {
        return JSON.stringify(item);
      })
      .join('\n')
      .replace(/(^\[)|(\]$)/gm, '');
    const blob = new Blob([csv], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, 'livestock.csv');
  };
  return (
    <Box p={4}>
      <Heading size={'lg'} pb={5}>
        Live Stock Section
      </Heading>
      {/* upload stock */}
      <InputGroup size={'sm'} w={'200px'}>
        <FormLabel
          width={'100%'}
          htmlFor={'csvInput'}
          _hover={{ cursor: 'pointer' }}
          textAlign={'center'}
        >
          Upload File
        </FormLabel>
        <Input
          display={'none'}
          type={'file'}
          id={'csvInput'}
          accept={'.csv'}
          onChange={onChangeHandler}
        />
        <InputRightAddon
          type={'button'}
          variant={'outline'}
          children={'Select csv'}
          _hover={{ cursor: 'pointer' }}
          onClick={onSubmitHandler}
        >
          Import
          <DownloadIcon ml={1} mt={1} />
        </InputRightAddon>
      </InputGroup>
      <Heading size={'md'} py={4}>
        Live Stock Table
      </Heading>
      <TableContainer
        rounded={'lg'}
        boxShadow={'lg'}
        h={240}
        w={1200}
        overflowY={'auto'}
        overflowX={'scroll'}
        bg={useColorModeValue('gray.100', 'gray.700')}
      >
        <Table variant="simple" size={'sm'}>
          <Thead position={'sticky'} top={0} backgroundColor={'lightblue'}>
            <Tr>
              <Th textAlign="center">Master SKU</Th>
              <Th textAlign="center">Opening Stock</Th>
              <Th textAlign="center">Purchase</Th>
              <Th textAlign="center">Sales</Th>
              <Th textAlign="center">Sales Return</Th>
              <Th textAlign="center">Purchase Return</Th>
              <Th textAlign="center">Live Stock</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mergedArray.map(item => (
              <Tr key={item._id}>
                <Td textAlign="center">
                  <Menu>
                    <MenuButton>{item.mastersku}</MenuButton>
                    <MenuList>
                      {item.skus !== undefined ? (
                        item.skus.map(item => (
                          <MenuItem key={item}> {item}</MenuItem>
                        ))
                      ) : (
                        <MenuItem>None</MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </Td>
                <Td textAlign="center">
                  {item.opening_stock === undefined ? 0 : item.opening_stock}
                </Td>
                <Td textAlign="center"> {item.purchase}</Td>
                <Td textAlign="center"> {item.sales}</Td>
                <Td textAlign="center">{item.salesReturn}</Td>
                <Td textAlign="center"> {item.purchaseReturn}</Td>
                <Td textAlign="center">{item.livestock}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={6} justifyContent={'center'}>
        <Button size={'sm'} onClick={downloadFile}>
          Download file
        </Button>
        <Button size={'sm'} onClick={deleteList}>
          Delete
        </Button>
        <Button size={'sm'} onClick={sendMergedArray}>
          Update
        </Button>
      </HStack>
    </Box>
  );
};

export default LiveStock;
