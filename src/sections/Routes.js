import { Routes, Route } from 'react-router-dom';
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

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/master" element={<MasterSKUPage />} />
      <Route path="/unmapped" element={<UnMappedPage />} />
      <Route path="/purchase" element={<PurchasePage />} />
      <Route path="/purchaseReturn" element={<PurchaseReturnPage />} />
      <Route path="/sales" element={<SalesPage />} />
      <Route path="/salesReturn" element={<SalesReturnPage />} />
      <Route path="/livestock" element={<LiveStockPage />} />
    </Routes>
  );
};

export default AllRoutes;
