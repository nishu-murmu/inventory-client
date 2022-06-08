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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// files

const LiveStock = () => {
  const [livestockArray, setLiveStockArray] = useState([]);

  useEffect(() => {
    const mergedData = async () => {
      const response = await fetch('http://localhost:3001/api/purchase/merged');
      const result = await response.json(response);
      console.log(result);
      setLiveStockArray(result);
    };
    mergedData();
  }, []);

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
                <Td textAlign="center"> {item.quantity}</Td>
                <Td textAlign="center"> {item.sales[0].QTY}</Td>
                <Td textAlign="center">0</Td>
                <Td textAlign="center"> {item.purchaseReturn[0].quantity}</Td>
                <Td textAlign="center">
                  {Math.abs(
                    parseInt(item.quantity) +
                      0 -
                      (parseInt(item.sales[0].QTY) +
                        parseInt(item.purchaseReturn[0].quantity))
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LiveStock;
