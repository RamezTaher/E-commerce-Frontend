import React from "react"
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Shipping from "./pages/Shipping"
import Payment from "./pages/Payment"
import Orders from "./pages/Orders"
import Order from "./pages/Order"

const App = () => {
  return (
    <>
      <Header />
      <main className="py-5">
        <Container>
          <Routes>
            <Route path="/orders/:id" element={<Order />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/products/:id" element={<Product />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </>
  )
}

export default App
