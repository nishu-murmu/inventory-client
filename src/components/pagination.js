import { Button, Icon, HStack, Text, Flex } from '@chakra-ui/react';
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
          onClick={() => {
            setCurrentPage(parseInt(1));
          }}
        >
          <Icon as={BiFirstPage} />
        </Button>
        <Button onClick={prevPage}>
          <Icon as={FcPrevious} />
        </Button>
      </Flex>
      <Text variant={'outline'}>
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </Text>
      <Flex>
        <Button onClick={nextPage}>
          <Icon as={FcNext} />
        </Button>
        <Button onClick={lastPage}>
          <Icon as={BiLastPage} />
        </Button>
      </Flex>
    </HStack>
  );
};

export default Pagination;
