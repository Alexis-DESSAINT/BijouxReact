import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import CategoryPage from './pages/CategoryPage/CategoryPage'; // <-- Assure-toi que c'est bien importé
import ArticlesPage from './pages/ArticlesPage/ArticlesPage';
import LoginPage from './pages/LoginPage/LoginPage';
import CartPage from './pages/CartPage/CartPage';
import SignupPage from './pages/SignupPage/SignupPage'; // <-- Importer SignupPage
import './styles/globals.css';

function App() {
    const [cartCount, setCartCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout cartCount={cartCount} />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<CategoryPage />} /> {/* <-- Ici */}
          <Route path="product/:id" element={<ProductPage onCartChange={setCartCount} />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="cart" element={<CartPage onCartChange={setCartCount} />} />
          <Route path="/signup" element={<SignupPage />} /> {/* <-- Ajout de la route pour SignupPage */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;