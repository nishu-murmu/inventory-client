import { Box } from '@chakra-ui/react';

//files
import Navigation from '../sections/navigation-section';
import Sales from '../components/sales';

const SalesPage = () => {
  return (
    <Box>
      <Navigation />
      <Sales />
    </Box>
  );
};

export default SalesPage;
