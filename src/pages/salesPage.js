import { VStack } from '@chakra-ui/react';

//files
import Navigation from '../sections/navigation-section';
import Sales from '../components/sales';

const SalesPage = () => {
  return (
    <VStack>
      <Navigation />
      <Sales />
    </VStack>
  );
};

export default SalesPage;
