import {useRef} from 'react'
import {
    Box,
    Heading,
    Table,
    TableContainer,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useColorModeValue,
    HStack,
    Input,
  } from '@chakra-ui/react';
  
  const UnMapped = () => {
    const parent = useRef()
    const grandParent = useRef()
    const child = useRef()
    const quantity = useRef()

    const submitHandler = () => {
      const enteredParent = parent.current.value;
      const enteredChild = child.current.value;
      const enteredGrandParent = grandParent.current.value;
      const enteredQuantity = quantity.current.value;
      console.log(enteredGrandParent+"_"+enteredParent+"_"+enteredChild)
    }

    return (
      <Box p={4}>
        <Heading className="purchase-heading" size={'lg'} pb={10}>
          UnMapped SKUs Section
        </Heading>
        <Heading size={'md'} pb={4}>
          Enter UnMapped SKUs
        </Heading>
        <HStack pb={8}>
          <Input type={'text'} Ref={grandParent} textAlign={'center'} placeholder={'grand-parent'} />
          <Input type={'text'} Ref={parent} textAlign={'center'} placeholder={'parent'} />
          <Input type={'text'} Ref={child} textAlign={'center'} placeholder={'child'} />
          <Input type={'text'} Ref={quantity} textAlign={'center'} placeholder={'quantity'} />
        </HStack>
        <Heading size={'md'} pb={4}>
          UnMapped SKUs Table
        </Heading>
        <TableContainer
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}
          bg={useColorModeValue('gray.100', 'gray.700')}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
              <Th textAlign={'center'}>No.</Th>
                <Th textAlign="center">SKU</Th>
                <Th textAlign="center">Date</Th>
                <Th textAlign="center">Quantity</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
              <Td textAlign={'center'}>1.</Td>
                <Td textAlign="center">example sku</Td>
                <Td textAlign="center">example date</Td>
                <Td textAlign="center">example quantity</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default UnMapped;