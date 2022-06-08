import { VStack } from '@chakra-ui/react';

// files
import UnMapped from '../../components/sku/unMapped';
import Navigation from '../../sections/navigation-section';
import AnimatedPage from '../AnimatedPage';

const UnMappedPage = () => {
  return (
    <AnimatedPage>
      <VStack>
        <Navigation />
        <UnMapped />
      </VStack>
    </AnimatedPage>
  );
};

export default UnMappedPage;
