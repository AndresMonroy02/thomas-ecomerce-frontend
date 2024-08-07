import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import LoginPage from './pages/user/auth/LoginPage';
import RegistrationPage from './pages/user/auth/RegisterPage';
import CategoriesPage from './pages/category/CategoriesPage';
// import FooterComponent from './components/common/Footer';
import UserService from './service/UserService';
import UpdateUser from './pages/user/UpdateUser';
import UserManagementPage from './pages/user/UserManagementPage';
import ProfilePage from './pages/user/ProfilePage';
import ProductsPage from './pages/products/ProductsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminProductsPage from './pages/products/AdminProductPage';
import AdminOrder from './pages/orders/AdminOrder';
import ReportOrder from './pages/orders/ReportOrder';

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              
              {/* Check if user is authenticated and admin before rendering admin-only routes */}
              {UserService.adminOnly() && (
                <>
                  <Route path="/category" element={<CategoriesPage />} />
                  <Route path="/admin/products" element={<AdminProductsPage />} />
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route path="/admin/order" element={<AdminOrder />} />
                  <Route path="/report-orders" element={<ReportOrder />} />
                  
                  <Route path="/admin/user-management" element={<UserManagementPage />} />
                  <Route path="/update-user/:userId" element={<UpdateUser />} />
                </>
              )}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
          {/* <FooterComponent /> */}
        </div>
        <ToastContainer />
      </BrowserRouter>
  );
}

export default App;
