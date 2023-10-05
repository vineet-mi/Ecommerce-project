import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to={"/"} />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/order"
              element={user ? <Order /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/cart"
              element={user ? <Cart /> : <Navigate to={"/login"} />}
              // element={<Cart />}
            />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
