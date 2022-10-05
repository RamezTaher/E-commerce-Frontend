import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"

const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <main className="py-5">
          <Container>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/products/:id" element={<Product />} />
              <Route path="/cart/:id" element={<Cart />} />
              <Route path="/cart/" element={<Cart />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
