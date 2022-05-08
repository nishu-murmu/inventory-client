import { VStack } from '@chakra-ui/react';

//files
import Navigation from '../sections/navigation-section';
import LiveStock from '../components/livestock';

const LiveStockPage = () => {
  return (
    <VStack>
      <Navigation />
      <LiveStock />
    </VStack>
  );
};

export default LiveStockPage;
