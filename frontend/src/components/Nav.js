import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

  return (
    <div>
        <img
        alt="logo"
        className="logo"
        src="https://e7.pngegg.com/pngimages/306/37/png-clipart-node-js-logo-node-js-javascript-web-application-express-js-computer-software-others-miscellaneous-text-thumbnail.png"/>
        {
           auth ? <ul className="nav-ul">
                <li>
                    <Link to="/">Product</Link>
                </li>
                <li>
                    <Link to="/add">Add Product</Link>
                </li>
                <li>
                    <Link to="/update">Update Product</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li> 
                    <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link>
                </li>
            </ul>:
            <ul className="nav-ul nav-right">
                <li> <Link to="/signup">Sign up</Link> </li> 
                <li><Link to="/login">Login</Link></li>
            </ul>
}
    </div>
  );
};

export default Nav;
