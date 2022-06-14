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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
// files

const LiveStock = () => {
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
  useEffect(() => {
    const sendMergedArray = async () => {
      livestockArray.map(item =>
        fetch(
          'https://cryptic-bayou-61420.herokuapp.com/api/livestock/create',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              mastersku: item.mastersku,
              purchase: item.purchase[0].quantity,
              purchaseReturn: item.purchaseReturn[0].quantity,
              sales: item.sales[0].QTY,
              salesReturn: 0,
              livestock: Math.abs(
                parseInt(item.purchase[0].quantity) +
                  0 -
                  (parseInt(item.sales[0].QTY) +
                    parseInt(item.purchaseReturn[0].quantity))
              ),
            }),
          }
        )
      );
    };
    sendMergedArray();
  }, [livestockArray]);

  // receive final livestock after calculations
  useEffect(() => {
    const finalLiveStock = async () => {
      const response = await fetch(
        'https://cryptic-bayou-61420.herokuapp.com/api/livestock/getAll'
      );
      const result = await response.json();
      setMergedArray(result);
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
              <Th textAlign={'center'}>SKU</Th>
              <Th textAlign={'center'}>Master SKU</Th>
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
                <Td textAlign="center"> {item.opening_stock}</Td>
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
      <Button onClick={downloadFile}>Download file</Button>
    </Box>
  );
};

export default LiveStock;
