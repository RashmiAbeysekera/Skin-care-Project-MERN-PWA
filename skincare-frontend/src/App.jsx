import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SkinCare from './pages/SkinCare';
import BodyCare from './pages/BodyCare';
import HairCare from './pages/HairCare';
import Aboutus from './pages/Aboutus';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Navbar from './components/navbar';
import Policy from './pages/Policy';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './context/CartContext';
import PayHereButton from './components/PayHereButton';
import ForgotPassword from './pages/ForgotPassword';

import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#fff5e1]">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/skincare" element={<SkinCare />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/bodycare" element={<BodyCare />} />
            <Route path="/haircare" element={<HairCare />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/policies" element={<Policy />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
