import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// files

const LiveStock = () => {
  const [masterskuArray, setMasterskuArray] = useState([]);
  const [purchaseArray, setPurchaseArray] = useState([]);
  const [purchaseReturnArray, setPurchaseReturnArray] = useState([]);
  const [salesArray, setSalesArray] = useState([]);
  const [salesReturnArray, setSalesReturnArray] = useState([]);
  const [mergedArray, setMergedArray] = useState([]);
  const [livestockArray, setLiveStockArray] = useState([]);

  useEffect(() => {
    const createLiveStock = async () => {
      await fetch('http://localhost:3001/api/livestock/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mergedArray),
      });
    };
    const masterskuData = async () => {
      const resposne = await fetch('http://localhost:3001/api/master/getAll');
      const result = await resposne.json();
      setMasterskuArray(result);
    };
    const purchaseData = async () => {
      const resposne = await fetch('http://localhost:3001/api/purchase/getAll');
      const result = await resposne.json();
      setPurchaseArray(result);
    };
    const purchaseReturnData = async () => {
      const resposne = await fetch(
        'http://localhost:3001/api/purchaseReturn/getAll'
      );
      const result = await resposne.json();
      setPurchaseReturnArray(result);
    };
    const salesData = async () => {
      const resposne = await fetch(
        'http://localhost:3001/api/sales/dispatchfilter'
      );
      const result = await resposne.json();
      setSalesArray(result);
    };
    const salesReturnData = async () => {
      const resposne = await fetch(
        'http://localhost:3001/api/salesReturn/getAll'
      );
      const result = await resposne.json();
      setSalesReturnArray(result);
    };

    const getLiveStock = async () => {
      const response = await fetch(
        'http://localhost:3001/api/livestock/calculations',
        {
          method: 'PUT',
        }
      );
      const result = await response.json();
      setLiveStockArray(result);
    };
    createLiveStock();
    getLiveStock();
    masterskuData();
    purchaseData();
    purchaseReturnData();
    salesData();
    salesReturnData();
  }, [mergedArray]);

  const mergeArray = () => {
    setMergedArray(
      masterskuArray.map(itm => ({
        ...purchaseArray.find(item => item.mastersku === itm.mastersku && item),
        ...itm,
      }))
    );
    setMergedArray(
      purchaseArray.map(itm => ({
        ...purchaseReturnArray.find(
          item => item.mastersku === itm.mastersku && item
        ),
        ...itm,
      }))
    );
  };

  return (
    <Box p={4}>
      <Heading size={'lg'} pb={10}>
        Live Stock Section
      </Heading>
      <Button onClick={mergeArray}>Get List</Button>
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
              <Th textAlign="center">Opening Stock</Th>
              <Th textAlign="center">Purchase</Th>
              <Th textAlign="center">Sales</Th>
              <Th textAlign="center">Sales Return</Th>
              <Th textAlign="center">Purchase Return</Th>
              <Th textAlign="center">Live Stock</Th>
            </Tr>
          </Thead>
          <Tbody>
            {livestockArray.map(item => (
              <Tr key={item._id}>
                <Td textAlign="center">{item.mastersku}</Td>
                <Td textAlign="center"> {item.opening_stock}</Td>
                <Td textAlign="center"> {item.purchase}</Td>
                <Td textAlign="center"> {item.sales}</Td>
                <Td textAlign="center"> {item.salesReturn}</Td>
                <Td textAlign="center"> {item.purchaseReturn}</Td>
                <Td textAlign="center"> {item.livestock}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LiveStock;
