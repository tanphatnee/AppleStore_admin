import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/productmanagement">Product Management</Link>
          </li>
          <li>
            <Link to="/usermanagement">User Management</Link>
          </li>
          <li>
            <Link to="/addproduct">Add Product</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Home;
