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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
// files

const LiveStock = () => {
  // const nav = useNavigate();
  const [mergedArray, setMergedArray] = useState([]);
  const [livestockArray, setLiveStockArray] = useState([]);
  // get the merged List
  useEffect(() => {
    const mergedData = async () => {
      const response = await fetch(
        'https://cryptic-bayou-61420.herokuapp.com/api/master/merged'
      );
      const result = await response.json(response);
      setLiveStockArray(result);
    };
    mergedData();
  }, []);
  // perform calculations and store it in backend
  const deleteList = async () => {
    await fetch('http://localhost:3001/api/livestock/delete', {
      method: 'DELETE',
    });
    console.log('deleted');
  };
  const sendMergedArray = async () => {
    livestockArray.map(item =>
      fetch('http://localhost:3001/api/livestock/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mastersku: item.mastersku,
          purchase: item.purchase.length === 0 ? 0 : item.purchase[0].quantity,
          purchaseReturn:
            item.purchaseReturn.length === 0
              ? 0
              : item.purchaseReturn[0].quantity,
          sales: item.sales.length === 0 ? 0 : item.sales[0].QTY,
          salesReturn:
            item.salesreturn.length === 0 ? 0 : item.salesReturn[0].QTY,
        }),
      })
    );
  };
  // receive final livestock after calculations
  useEffect(() => {
    const finalLiveStock = async () => {
      const response = await fetch(
        'http://localhost:3001/api/livestock/getAll'
      );
      const result = await response.json();
      setMergedArray(result);
      console.log(result);
    };
    finalLiveStock();
  }, []);
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
      <Heading size={'lg'} pb={10}>
        Live Stock Section
      </Heading>
      <Heading size={'md'} pb={4}>
        Live Stock Table
      </Heading>
      <TableContainer
        rounded={'lg'}
        boxShadow={'lg'}
        h={400}
        w={1200}
        overflowY={'auto'}
        overflowX={'scroll'}
        bg={useColorModeValue('gray.100', 'gray.700')}
      >
        <Table variant="simple">
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
                <Td textAlign="center">{item.mastersku}</Td>
                <Td textAlign="center"> {0}</Td>
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
        <Button onClick={downloadFile}>Download file</Button>
        <Button onClick={deleteList}>Delete</Button>
        <Button onClick={sendMergedArray}>Update</Button>
      </HStack>
    </Box>
  );
};

export default LiveStock;
