import { VStack } from '@chakra-ui/react';

//files
import PurchaseReturn from '../components/purchase-return';
import Navigation from '../sections/navigation-section';

const PurchaseReturnPage = () => {
  return (
    <VStack>
      <Navigation />
      <PurchaseReturn />
    </VStack>
  );
};

export default PurchaseReturnPage;
