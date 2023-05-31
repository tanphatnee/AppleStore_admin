import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductManagement from "./components/ProductManagement";
import UserManagement from "./components/UserManagement";
import AddProduct from "./components/AddProduct";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <div>
      <Home />
      <Routes>
        <Route path="/admin" element={<Home />} />
        <Route path="/productmanagement" element={<ProductManagement />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
