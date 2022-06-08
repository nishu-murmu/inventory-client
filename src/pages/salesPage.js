import { VStack } from '@chakra-ui/react';

//files
import Navigation from '../sections/navigation-section';
import Sales from '../components/sales';
import AnimatedPage from './AnimatedPage';

const SalesPage = () => {
  return (
    <AnimatedPage>
      <VStack>
        <Navigation />
        <Sales />
      </VStack>
    </AnimatedPage>
  );
};

export default SalesPage;
