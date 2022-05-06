import { Box } from '@chakra-ui/react';

//files
import PurchaseReturn from '../components/purchase-return';
import Navigation from '../sections/navigation-section';

const PurchaseReturnPage = () => {
  return (
    <Box>
      <Navigation />
      <PurchaseReturn />
    </Box>
  );
};

export default PurchaseReturnPage;
