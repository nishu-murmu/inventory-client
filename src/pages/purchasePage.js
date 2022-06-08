import { VStack } from '@chakra-ui/react';

//files
import Navigation from '../sections/navigation-section';
import Purchase from '../components/purchase';
import AnimatedPage from './AnimatedPage';

const PurchasePage = () => {
  return (
    <AnimatedPage>
      <VStack>
        <Navigation />
        <Purchase />
      </VStack>
    </AnimatedPage>
  );
};

export default PurchasePage;
