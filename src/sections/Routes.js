import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// files
import PurchasePage from '../pages/purchasePage.js';
import PurchaseReturnPage from '../pages/purchaseReturnPage.js';
import SalesPage from '../pages/salesPage.js';
import SalesReturnPage from '../pages/salesReturnPage.js';
import LoginPage from '../pages/Auth/loginPage.js';
import SignUpPage from '../pages/Auth/signUpPage.js';
import AccountPage from '../pages/Auth/AccountPage.js';
import MasterSKUPage from '../pages/Sku/masterSKUPage.js';
import UnMappedPage from '../pages/Sku/unMapped.js';
import LiveStockPage from '../pages/livestockPage.js';
import Protected from './protectedRoutes.js';

const AllRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route index path="/" element={<SignUpPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route
          exact
          path="/account"
          element={
            <Protected>
              <AccountPage />
            </Protected>
          }
        />
        <Route
          exact
          path="/master"
          element={
            <Protected>
              <MasterSKUPage />
            </Protected>
          }
        />
        <Route
          exact
          path="/unmapped"
          element={
            <Protected>
              <UnMappedPage />
            </Protected>
          }
        />
        <Route
          exact
          path="/purchase"
          element={
            <Protected>
              <PurchasePage />
            </Protected>
          }
        />
        <Route
          exact
          path="/purchaseReturn"
          element={
            <Protected>
              <PurchaseReturnPage />
            </Protected>
          }
        />
        <Route
          exact
          path="/sales"
          element={
            <Protected>
              <SalesPage />
            </Protected>
          }
        />
        <Route
          exact
          path="/salesReturn"
          element={
            <Protected>
              <SalesReturnPage />
            </Protected>
          }
        />
        <Route
          exact
          path="/livestock"
          element={
            <Protected>
              <LiveStockPage />
            </Protected>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AllRoutes;
