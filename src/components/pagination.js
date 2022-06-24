import { Button, Icon, HStack, Text, Flex } from '@chakra-ui/react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { BiLastPage, BiFirstPage } from 'react-icons/bi';
// import { useState } from 'react';

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  // const [isLast, setIsLast] = useState(false);
  // const [isFirst, setIsFirst] = useState(false);
  const nextPage = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const lastPage = () => {
    setCurrentPage(parseInt(totalPages));
  };
  return (
    <HStack justifyContent={'space-evenly'}>
      <Flex>
        <Button
          size={'sm'}
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          <Icon as={BiFirstPage} />
        </Button>
        <Button size={'sm'} onClick={prevPage}>
          <Icon as={FcPrevious} />
        </Button>
      </Flex>
      <Text variant={'outline'}>
        Page
        <strong>{isNaN(currentPage) ? '1' : currentPage.toString()}</strong>
        of
        <strong>{totalPages}</strong>
      </Text>
      <Flex>
        <Text px={2}>Goto Page:</Text>
        <NumberInput
          size={'sm'}
          defaultValue={1}
          maxW={20}
          min={0}
          max={totalPages}
        >
          <NumberInputField
            onChange={e => {
              if (e.target.value.length === 0) setCurrentPage(1);
              setCurrentPage(parseInt(e.target.value));
            }}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <Flex>
        <Button size={'sm'} onClick={nextPage}>
          <Icon as={FcNext} />
        </Button>
        <Button size={'sm'} onClick={lastPage}>
          <Icon as={BiLastPage} />
        </Button>
      </Flex>
    </HStack>
  );
};

export default Pagination;
