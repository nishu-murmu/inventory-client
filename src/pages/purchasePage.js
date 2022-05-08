import { VStack } from '@chakra-ui/react';

//files
import Navigation from '../sections/navigation-section';
import Purchase from '../components/purchase';

const PurchasePage = () => {
  return (
    <VStack>
      <Navigation />
      <Purchase />
    </VStack>
  );
};

export default PurchasePage;
