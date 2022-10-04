import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./pages/Product"
import Cart from "./pages/Cart"

const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <main className="py-5">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/cart/:id" element={<Cart />} />
              <Route path="/cart/" element={<Cart />} />
            </Routes>
          </Container>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
