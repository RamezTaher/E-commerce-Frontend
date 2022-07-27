import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./pages/Product"

const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
            </Routes>
          </Container>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
