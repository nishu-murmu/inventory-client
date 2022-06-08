import { VStack } from '@chakra-ui/react';

//files
import PurchaseReturn from '../components/purchase-return';
import Navigation from '../sections/navigation-section';
import AnimatedPage from './AnimatedPage';

const PurchaseReturnPage = () => {
  return (
    <AnimatedPage>
      <VStack>
        <Navigation />
        <PurchaseReturn />
      </VStack>
    </AnimatedPage>
  );
};

export default PurchaseReturnPage;
