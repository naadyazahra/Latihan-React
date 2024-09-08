import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './Products';
import AddProduct from './AddProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
