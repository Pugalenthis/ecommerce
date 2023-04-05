import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Landing from "./components/Landing";
import ViewProduct from "./components/ViewProduct";
import Checkout from "./components/Checkout";

import Profile from "./components/Profile";
import UsersList from "./components/UsersList";
import ProductsList from "./components/ProductsList";
import ApproveAdmin from "./components/ApproveAdmin";
import CreateProductForm from "./components/CreateProductForm";
import Footer from "./components/Footer";
import ConfirmedOrder from "./components/ConfirmedOrder";
import OrdersList from "./components/OrdersList";
import ApproveOrder from "./components/ApproveOrder";
import React, { useEffect } from "react";
import Alert from "./components/Alert";
import { setAuthToken } from "./utils/setAuthToken";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/auth";
import { addItemsFromLocalStorage } from "./slices/cartSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      dispatch(loadUser());
    }
    dispatch(addItemsFromLocalStorage());
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ViewProduct />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/orders" element={<OrdersList />} />
          <Route path="/confirmedorder" element={<ConfirmedOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/approveadmin" element={<ApproveAdmin />} />
          <Route path="/approveOrder" element={<ApproveOrder />} />
          <Route path="/createproduct" element={<CreateProductForm />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
