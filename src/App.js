import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Shipping from "./pages/Shipping"

const App = () => {
  return (
    <>
      <Header />
      <main className="py-5">
        <Container>
          <Routes>
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
