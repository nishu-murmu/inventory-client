import { useState, useRef } from 'react';
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
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  Button,
  HStack,
  Input,
} from '@chakra-ui/react';

const UnMapped = () => {
  const parent = useRef();
  const grandParent = useRef();
  const child = useRef();
  const quantity = useRef();
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

  // const submitHandler = () => {
  //   const enteredParent = parent.current.value;
  //   const enteredChild = child.current.value;
  //   const enteredGrandParent = grandParent.current.value;
  //   const enteredQuantity = quantity.current.value;
  //   console.log(
  //     enteredGrandParent +
  //       '_' +
  //       enteredParent +
  //       '_' +
  //       enteredChild +
  //       ',' +
  //       enteredQuantity +
  //       ',' +
  //       new Date()
  //   );
  // };

  return (
    <VStack pb={8}>
      <Heading className="purchase-heading" size={'lg'} pb={10}>
        UnMapped SKUs Section
      </Heading>
      <HStack spacing={20}>
        <VStack>
          <HStack>
            <Input
              type={'file'}
              id={'csvInput'}
              placeholder={'Choose a file'}
              accept={'.csv'}
              onChange={onChangeHandler}
            />
            <Button onClick={e => onSubmitHandler(e)}>Import CSV file</Button>
          </HStack>
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
                  <Tr key={'header'}>
                    {headerKeys.map(key => (
                      <Th contentEditable={'true'} textAlign={'center'}>
                        {key}
                      </Th>
                    ))}
                  </Tr>
                </Thead>

                <Tbody>
                  {array.map(item => (
                    <Tr key={item.id}>
                      {Object.values(item).map(val => (
                        <Td contentEditable={'true'} textAlign={'center'}>
                          {val}
                        </Td>
                      ))}
                    </Tr>
                  ))}
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
              placeholder={'Opening Stock'}
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
                  <Th textAlign="center">SKU</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
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
