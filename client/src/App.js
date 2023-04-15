import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import React, { useEffect } from "react";
import Alert from "./components/Alert";
import { setAuthToken } from "./utils/setAuthToken";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/auth";
import { addItemsFromLocalStorage } from "./slices/cartSlice";
import Payment from "./components/Payment";
import Myorders from "./components/myOrders";
import AdminOrderView from "./components/AdminOrderView";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();

  const { auth, isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("user in app.js", user);

  useEffect(() => {
    // check for token in localstorage and if exists sets in header for all request

    if (localStorage.getItem("token") !== null) {
      console.log("token in useeffect app.js", localStorage.token);
      setAuthToken(localStorage.token);
      dispatch(loadUser());
    }
  }, []);

  const allRoutes = [
    <Route path="/" element={<Landing />} />,
    <Route path="/login" element={<Login />} />,
    <Route path="/register" element={<Register />} />,
    <Route path="/cart" element={<Cart />} />,
    <Route path="/product/:id" element={<ViewProduct />} />,
    <Route path="*" element={<NotFound />} />,
    <Route path="/checkout" element={<Checkout />} />,
    <Route path="/orders" element={<OrdersList />} />,
    <Route path="/confirmedorder/:order_id" element={<ConfirmedOrder />} />,
    <Route path="/order/:order_id" element={<AdminOrderView />} />,
    <Route
      path="myOrders"
      element={
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <Myorders />
        </PrivateRoute>
      }
    />,
    <Route path="/profile" element={<Profile />} />,
    <Route path="/users" element={<UsersList />} />,
    <Route
      path="/products"
      element={
        <PrivateRoute isAuthenticated={user ? user.isAdmin : ""}>
          <ProductsList />
        </PrivateRoute>
      }
    />,
    <Route path="/approveadmin" element={<ApproveAdmin />} />,
    <Route path="/createproduct" element={<CreateProductForm />} />,
  ];

  return (
    <div>
      <Router>
        <Navbar />
        <Alert />
        <Routes>{allRoutes}</Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
