import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Landing from "./components/Landing";
import ViewProduct from "./components/ViewProduct";
import Checkout from "./components/Checkout";
import OrderPreview from "./components/OrderPreview";
import Profile from "./components/Profile";
import UsersList from "./components/UsersList";
import ProductsList from "./ProductsList";
import ApproveAdmin from "./components/ApproveAdmin";
import CreateProductForm from "./components/CreateProductForm";
import Footer from "./components/Footer";
import ConfirmedOrder from "./components/ConfirmedOrder";
import OrdersList from "./components/OrdersList";
import ApproveOrder from "./components/ApproveOrder";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ViewProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderpreview" element={<OrderPreview />} />
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
