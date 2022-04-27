import { VStack, HStack, Button } from '@chakra-ui/react';
import { Link, Route, Routes } from 'react-router-dom';
//files
import LiveStock from './livestock';
import Purchase from './sections/purchase';
import PurchaseReturn from './sections/purchase-return';

const DashBoard = () => {
  return (
    <VStack>
      <HStack spacing="20">
        <Routes>
          <Route path="Purchase" element={<Purchase />} />
          <Route path="PurchaseReturn" element={<PurchaseReturn />} />
        </Routes>
        <Button>
          <Link to="Purchase">Purchase</Link>
        </Button>
        <Button>
          <Link to="/PurchaseReturn">Purchase Return</Link>
        </Button>
        <Button>
          <Link to="/Sales">Sales</Link>
        </Button>
        <Button>
          <Link to="/SalesReturn">Sales Return</Link>
        </Button>
      </HStack>
      <LiveStock />
    </VStack>
  );
};

export default DashBoard;
