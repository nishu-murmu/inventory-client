import { Box } from '@chakra-ui/react';

// files
import UnMapped from '../../components/sku/unmapped';
import Navigation from '../../sections/navigation-section';

const UnMappedPage = () => {
  return (
    <Box>
      <Navigation />
      <UnMapped />
    </Box>
  );
};

export default UnMappedPage;
