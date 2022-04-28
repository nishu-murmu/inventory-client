import { Box, Heading, HStack, Input } from '@chakra-ui/react';

//files
import './purchase-return.css';

const PurchaseReturn = () => {
  return (
    <Box>
      <Heading className="purchaseReturn-heading" as="h1" size="lg">
        Purchase Return Section
      </Heading>
      <HStack>
        <Input placeholder="Enter SKU" textAlign="center" />
        <Input placeholder="Enter Date" textAlign="center" />
        <Input placeholder="Enter Quantity" textAlign="center" />
      </HStack>
    </Box>
  );
};

export default PurchaseReturn;
