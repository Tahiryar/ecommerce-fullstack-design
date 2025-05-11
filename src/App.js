import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/main/Home';
import ProductList from './views/listview/ProductList';
import AddToCart from './views/cart/AddToCart';
import ProductDetail from './views/detail/ProductDetail';
import './assets/css/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<AddToCart />} />
      </Routes>
    </Router>
  );
}

export default App;
