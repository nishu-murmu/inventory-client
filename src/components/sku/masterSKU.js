import { useEffect, useState } from 'react';
import {
  Heading,
  Table,
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
  Radio,
  RadioGroup,
  Select,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const Mapped = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState([]);

  const [grandParent, setGrandParent] = useState('');
  const [parent, setParent] = useState('');
  const [child, setChild] = useState('');

  const [isSingle, setIsSingle] = useState(true);

  const [isChange, setIsChange] = useState(false);

  const toggleChange = () => {
    setIsChange(!isChange);
  };
  const submitArrayHandler = () => {
    fetch('http://localhost:3001/api/master/store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grand_parent: grandParent,
        parent,
        child,
        mastersku: [grandParent, parent, child].join('_'),
      }),
    });
  };

  const getListHandler = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:3001/api/master/getAll');
    const result = await response.json();
    setIsLoading(false);
    setArray(result);
  };

  useEffect(() => {
    getListHandler();
  }, [isChange]);
  return (
    <VStack p={4}>
      <Heading size={'lg'} pb={10}>
        Master SKU Section
      </Heading>
      <RadioGroup defaultChecked={'1'} width={'40%'}>
        <Flex justifyContent={'space-evenly'}>
          <Radio onChange={() => setIsSingle(true)} value={'1'}>
            Single
          </Radio>
          <Radio onChange={() => setIsSingle(false)} value={'2'}>
            Combo
          </Radio>
        </Flex>
      </RadioGroup>

      {isSingle && (
        <form
          onSubmit={e => {
            submitArrayHandler(e);
            toggleChange(e);
          }}
          py={4}
        >
          <FormControl pt={6}>
            <FormLabel htmlFor="single">Create Single Master SKU</FormLabel>
            <VStack id={'single'}>
              <Flex>
                <Input
                  textAlign={'center'}
                  onChange={e => {
                    setGrandParent(e.target.value);
                  }}
                  placeholder="grand-parent"
                  required
                />
                <Input
                  textAlign={'center'}
                  onChange={e => {
                    setParent(e.target.value);
                  }}
                  placeholder="parent"
                  required
                />
                <Input
                  textAlign={'center'}
                  onChange={e => {
                    setChild(e.target.value);
                  }}
                  placeholder="child"
                  required
                />
              </Flex>
              <Button type={'submit'} w={'100%'} px={10} my={5}>
                Submit
              </Button>
            </VStack>
          </FormControl>
        </form>
      )}
      {!isSingle && (
        <form
          onSubmit={e => {
            submitArrayHandler(e);
            toggleChange(e);
          }}
          py={4}
        >
          <FormControl pt={6}>
            <FormLabel htmlFor="single">Create Combo Master SKU</FormLabel>
            <VStack id={'single'}>
              <Flex>
                <Input
                  textAlign={'center'}
                  onChange={e => {
                    setGrandParent(e.target.value);
                  }}
                  placeholder="grand-parent"
                  required
                />
                <Input
                  textAlign={'center'}
                  onChange={e => {
                    setParent(e.target.value);
                  }}
                  placeholder="parent"
                  required
                />
                <Input
                  textAlign={'center'}
                  onChange={e => {
                    setChild(e.target.value);
                  }}
                  placeholder="child"
                  required
                />
              </Flex>
              <VStack></VStack>
              <Button type={'submit'} w={'100%'} px={10} my={5}>
                Submit
              </Button>
            </VStack>
          </FormControl>
        </form>
      )}

      {isLoading && <Spinner size={'xl'} />}
      {!isLoading && (
        <VStack>
          <Heading size={'md'} pt={20} pb={4}>
            Master SKU Table
          </Heading>
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
                  <Th textAlign={'center'}>GrandParent</Th>
                  <Th textAlign={'center'}>Parent</Th>
                  <Th textAlign={'center'}>Child</Th>
                  <Th textAlign={'center'}>Master SKU</Th>
                </Tr>
              </Thead>

              <Tbody>
                {array.map(item => (
                  <Tr key={item._id}>
                    <Td textAlign={'center'}>{item.grand_parent}</Td>
                    <Td textAlign={'center'}>{item.parent}</Td>
                    <Td textAlign={'center'}>{item.child}</Td>
                    <Td textAlign={'center'}>{item.mastersku}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      )}
    </VStack>
  );
};

export default Mapped;
