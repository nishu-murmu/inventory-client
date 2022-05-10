import { useRef } from 'react';
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Input,
} from '@chakra-ui/react';

const UnMapped = () => {
  const parent = useRef();
  const grandParent = useRef();
  const child = useRef();
  const quantity = useRef();

  const submitHandler = () => {
    const enteredParent = parent.current.value;
    const enteredChild = child.current.value;
    const enteredGrandParent = grandParent.current.value;
    const enteredQuantity = quantity.current.value;
    console.log(
      enteredGrandParent +
        '_' +
        enteredParent +
        '_' +
        enteredChild +
        ',' +
        enteredQuantity +
        ',' +
        new Date()
    );
  };

  return (
    <VStack pb={8}>
      <Heading className="purchase-heading" size={'lg'} pb={10}>
        UnMapped SKUs Section
      </Heading>
      <HStack spacing={20}>
        <VStack>
          <VStack style={{ marginLeft: '60px' }}>
            <Heading size={'md'} pb={4}>
              UnMapped SKUs Table
            </Heading>
            <TableContainer
              rounded={'lg'}
              boxShadow={'lg'}
              h={250}
              overflowY={'auto'}
              overflowX={'hidden'}
              bg={useColorModeValue('gray.100', 'gray.700')}
            >
              <Table variant="simple">
                <Thead
                  position={'sticky'}
                  top={0}
                  backgroundColor={'lightblue'}
                >
                  <Tr>
                    <Th textAlign={'center'}>No.</Th>
                    <Th textAlign="center">SKU</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td textAlign={'center'}>1.</Td>
                    <Td textAlign="center">example sku</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </VStack>
        <VStack>
          <Heading size={'md'} pb={4}>
            Enter Master SKUs
          </Heading>
          <HStack>
            <Input
              type={'text'}
              ref={grandParent}
              textAlign={'center'}
              placeholder={'grand-parent'}
            />
            <Input
              type={'text'}
              ref={parent}
              textAlign={'center'}
              placeholder={'parent'}
            />
            <Input
              type={'text'}
              ref={child}
              textAlign={'center'}
              placeholder={'child'}
            />
            <Input
              type={'text'}
              ref={quantity}
              textAlign={'center'}
              placeholder={'quantity'}
            />
            {/*<Button w={'100%'} onClick={submitHandler}>
              Submit
            </Button>
            <Menu>
              <MenuButton w={'100%'} as={Button}>
                Filter
              </MenuButton>
              <MenuList>
                <MenuItem>Date</MenuItem>
                <MenuItem>Quantity</MenuItem>
              </MenuList>
            </Menu>*/}
          </HStack>
        </VStack>
        <VStack style={{ marginRight: '60px' }}>
          <Heading size={'md'} pb={4}>
            Master SKUs Table
          </Heading>
          <TableContainer
            rounded={'lg'}
            boxShadow={'lg'}
            h={250}
            overflowY={'auto'}
            overflowX={'hidden'}
            bg={useColorModeValue('gray.100', 'gray.700')}
          >
            <Table variant="simple">
              <Thead position={'sticky'} top={0} backgroundColor={'lightblue'}>
                <Tr>
                  <Th textAlign={'center'}>No.</Th>
                  <Th textAlign="center">SKU</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td textAlign={'center'}>1.</Td>
                  <Td textAlign="center">example sku</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default UnMapped;
