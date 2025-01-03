import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "../Ecommerce/ProductList";
import ProductDetail from "../Ecommerce/ProductDetail";
import Login from "../Ecommerce/LoginForm";
import Signup from "../Ecommerce/SignupForm";
import ProductForm from "./ProductForm";

const EcommerceManager = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 mt-6">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addproduct" element={<ProductForm />} />
      </Routes>
    </div>
  );
};

export default EcommerceManager;
