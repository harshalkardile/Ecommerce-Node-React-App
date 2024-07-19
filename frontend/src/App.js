import "./App.css";
import Nav from "./components/Nav";
// import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import Shop from "./components/Shop";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route
              path="/"
              element={
                <h1>
                  {" "}
                  <ProductList />{" "}
                </h1>
              }
            />
            <Route path="/add" element={<AddProduct />} />
            <Route
              path="/update/:id"
              element={
                <h1>
                  <UpdateProduct />
                </h1>
              }
            />
            <Route
              path="/logout"
              element={<h1> Product logout Component</h1>}
            />
            <Route
              path="/orders"
              element={
                <h1>
                  {" "}
                  <Orders />
                </h1>
              }
            />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
