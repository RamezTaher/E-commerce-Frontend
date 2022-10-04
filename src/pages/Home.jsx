import React from "react"
import products from "../products"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"

const Home = () => {
  return (
    <>
      <h1 className="my-2">The Lastest Products</h1>
      <Row>
        {products.map((product, idx) => (
          <Col key={idx} sm={12} md={6} lg={4} xl={3} className="my-2">
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Home
