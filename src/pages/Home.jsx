import React, { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { useDispatch, useSelector } from "react-redux"
import { products } from "../actions/productsActions"

const Home = () => {
  const dispatch = useDispatch()
  const productsList = useSelector((state) => state.productsList)

  useEffect(() => {
    dispatch(products())
  }, [dispatch])

  return (
    <>
      <h1 className="my-2">The Lastest Products</h1>
      {productsList?.loading ? (
        <Loader />
      ) : productsList.error ? (
        <Message variant="danger">productsList.error</Message>
      ) : (
        <Row>
          {productsList?.data?.products?.map((product, idx) => (
            <Col key={idx} sm={12} md={6} lg={4} xl={3} className="my-2">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Home
