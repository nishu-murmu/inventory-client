import { VStack, HStack, Button } from '@chakra-ui/react';

//files
import LiveStock from './livestock';

const DashBoard = () => {
  return (
    <VStack>
      <HStack spacing="20">
        <Button>Sales</Button>
        <Button>Sales Return</Button>
        <Button>Purchase</Button>
        <Button>Purchase Return</Button>
      </HStack>
      <LiveStock />
    </VStack>
  );
};

export default DashBoard;
