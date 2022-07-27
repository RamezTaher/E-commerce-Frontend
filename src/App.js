import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>this my e commerce</h1>
          <Home />
        </Container>
      </main>

      <Footer />
    </>
  )
}

export default App
