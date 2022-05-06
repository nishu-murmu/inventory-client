import { Box } from '@chakra-ui/react';

//files
import Navigation from '../sections/navigation-section';
import LiveStock from '../components/livestock';

const LiveStockPage = () => {
  return (
    <Box>
      <Navigation />
      <LiveStock />
    </Box>
  );
};

export default LiveStockPage;
