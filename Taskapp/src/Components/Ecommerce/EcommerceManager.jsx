import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "../Ecommerce/ProductList";
import ProductDetail from "../Ecommerce/ProductDetail";
import Login from "../Ecommerce/LoginForm";
import Signup from "../Ecommerce/SignupForm";
import ProductForm from "./ProductForm";
import { Toast } from "../../ui/index";
import Cart from "./Cart";

const EcommerceManager = () => {
  return (
    <div className=" mx-auto p-6 mt-6 w-full">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addproduct" element={<ProductForm />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Toast />
    </div>
  );
};

export default EcommerceManager;
