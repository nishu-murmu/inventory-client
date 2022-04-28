import { Box, Heading, HStack, Input } from '@chakra-ui/react';

//files
import './purchase.css';

const Purchase = () => {
  return (
    <Box>
      <Heading className="purchase-heading" as="h1" size="lg">
        Purchase Section
      </Heading>
      <HStack>
        <Input placeholder="Enter SKU" textAlign="center" />
        <Input placeholder="Enter Date" textAlign="center" />
        <Input placeholder="Enter Quantity" textAlign="center" />
      </HStack>
    </Box>
  );
};

export default Purchase;
