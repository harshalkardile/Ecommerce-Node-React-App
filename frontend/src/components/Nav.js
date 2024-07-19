import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import './Nav.css';

const Nav = () => {

    const [{basket}, dispatch] = useStateValue();
  
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

  return (
    <div className="navbar-container">
    <img
      alt="logo"
      className="navbar-logo"
      src="https://e7.pngegg.com/pngimages/306/37/png-clipart-node-js-logo-node-js-javascript-web-application-express-js-computer-software-others-miscellaneous-text-thumbnail.png"
    />
    {auth ? (
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link className="navbar-link" to="/">Products</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/add">Add Product</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/orders">Orders</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link>
        </li>
      </ul>
    ) : (
      <ul className="navbar-menu navbar-menu-right">
        <li className="navbar-item">
          <Link className="navbar-link" to="/shop">Shop</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/checkout">Cart ({basket?.length})</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/signup">Sign up</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/login">Login</Link>
        </li>
      </ul>
    )}
  </div>
  );
};

export default Nav;
