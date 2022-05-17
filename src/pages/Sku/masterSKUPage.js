import { VStack } from '@chakra-ui/react';

// files
import Navigation from '../../sections/navigation-section';
import MasterSKU from '../../components/sku/masterSKU';

const MasterSKUPage = () => {
  return (
    <VStack>
      <Navigation />
      <MasterSKU />
    </VStack>
  );
};

export default MasterSKUPage;
