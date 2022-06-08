import { VStack } from '@chakra-ui/react';

//files
import Navigation from '../sections/navigation-section';
import LiveStock from '../components/livestock';
import AnimatedPage from './AnimatedPage';

const LiveStockPage = () => {
  return (
    <AnimatedPage>
      <VStack>
        <Navigation />
        <LiveStock />
      </VStack>
    </AnimatedPage>
  );
};

export default LiveStockPage;
