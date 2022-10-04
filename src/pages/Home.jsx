import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import axios from "axios"
import { API_URL } from "../constants/api"

const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get(`${API_URL}/api/products`)
      setProducts(data)
    }

    getProducts()
  }, [])

  return (
    <>
      <h1 className="my-2">The Lastest Products</h1>
      <Row>
        {products?.products?.map((product, idx) => (
          <Col key={idx} sm={12} md={6} lg={4} xl={3} className="my-2">
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Home
