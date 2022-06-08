import { VStack } from '@chakra-ui/react';

//files
import Navigation from '../sections/navigation-section';
import SalesReturn from '../components/sales-return';
import AnimatedPage from './AnimatedPage';

const SalesReturnPage = () => {
  return (
    <AnimatedPage>
      <VStack>
        <Navigation />
        <SalesReturn />
      </VStack>
    </AnimatedPage>
  );
};

export default SalesReturnPage;
