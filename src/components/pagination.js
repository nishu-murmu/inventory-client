import { Button, Flex } from '@chakra-ui/react';

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  //   const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <Flex justifyContent={'space-around'}>
      <Button onClick={prevPage}>Previous</Button>
      {/* {pageNumbers.map(pgNumber => (
        <Button
          key={pgNumber}
          className={`page-item ${currentPage === pgNumber ? 'active' : ''} `}
        >
          <Button onClick={() => setCurrentPage(pgNumber)}>{pgNumber}</Button>
        </Button>
      ))} */}
      <Button onClick={nextPage}>Next</Button>
    </Flex>
  );
};

export default Pagination;
