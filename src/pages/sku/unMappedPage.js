import { VStack } from '@chakra-ui/react';

// files
import UnMapped from '../../components/sku/unmapped';
import Navigation from '../../sections/navigation-section';

const UnMappedPage = () => {
  return (
    <VStack>
      <Navigation />
      <UnMapped />
    </VStack>
  );
};

export default UnMappedPage;
