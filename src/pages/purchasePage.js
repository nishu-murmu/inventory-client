import { Box } from '@chakra-ui/react';

//files
import Navigation from '../sections/navigation-section';
import Purchase from '../components/purchase';

const PurchasePage = () => {
  return (
    <Box>
      <Navigation />
      <Purchase />
    </Box>
  );
};

export default PurchasePage;
