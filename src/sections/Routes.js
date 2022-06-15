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
import AuthCredPage from '../components/Auth/authCred.js';

const AllRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<SignUpPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/account" element={<AccountPage />} />
        <Route exact path="/authCred" element={<AuthCredPage />} />
        <Route exact path="/master" element={<MasterSKUPage />} />
        <Route exact path="/unmapped" element={<UnMappedPage />} />
        <Route exact path="/purchase" element={<PurchasePage />} />
        <Route exact path="/purchaseReturn" element={<PurchaseReturnPage />} />
        <Route exact path="/sales" element={<SalesPage />} />
        <Route exact path="/salesReturn" element={<SalesReturnPage />} />
        <Route exact path="/livestock" element={<LiveStockPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AllRoutes;
