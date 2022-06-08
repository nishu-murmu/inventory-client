import { VStack } from '@chakra-ui/react';

// files
import Navigation from '../../sections/navigation-section';
import MasterSKU from '../../components/sku/masterSKU';
import AnimatedPage from '../AnimatedPage';

const MasterSKUPage = () => {
  return (
    <AnimatedPage>
      <VStack>
        <Navigation />
        <MasterSKU />
      </VStack>
    </AnimatedPage>
  );
};

export default MasterSKUPage;
