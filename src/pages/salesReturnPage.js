import { VStack } from '@chakra-ui/react';

//files
import Navigation from '../sections/navigation-section';
import SalesReturn from '../components/sales-return';

const SalesReturnPage = () => {
  return (
    <VStack>
      <Navigation />
      <SalesReturn />
    </VStack>
  );
};

export default SalesReturnPage;
