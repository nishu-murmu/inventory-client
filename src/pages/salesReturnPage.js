import { Box } from '@chakra-ui/react';

//files
import Navigation from '../sections/navigation-section';
import SalesReturn from '../components/sales-return';

const SalesReturnPage = () => {
  return (
    <Box>
      <Navigation />
      <SalesReturn />
    </Box>
  );
};

export default SalesReturnPage;
