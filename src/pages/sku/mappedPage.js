import { VStack } from '@chakra-ui/react';

// files
import Navigation from '../../sections/navigation-section';
import Mapped from '../../components/sku/mapped';

const MappedPage = () => {
  return (
    <VStack>
      <Navigation />
      <Mapped />
    </VStack>
  );
};

export default MappedPage;
