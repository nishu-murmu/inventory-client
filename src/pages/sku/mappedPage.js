import { Box } from '@chakra-ui/react';

// files
import Navigation from '../../sections/navigation-section';
import Mapped from '../../components/sku/mapped';

const MappedPage = () => {
  return (
    <Box>
      <Navigation />
      <Mapped />
    </Box>
  );
};

export default MappedPage;
