import React, { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { useDispatch, useSelector } from "react-redux"
import { products } from "../redux/actions/productsActions"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Home = () => {
  const { t } = useTranslation(["translation"])
  const dispatch = useDispatch()
  const productsList = useSelector((state) => state.productsList)

  useEffect(() => {
    dispatch(products())
  }, [dispatch])

  return (
    <>
      {t("translation:title")}
      <h1 className="my-2">The Lastest Products</h1>
      {productsList?.loading ? (
        <Loader />
      ) : productsList.error ? (
        <Message variant="danger">productsList.error</Message>
      ) : (
        <Row>
          {productsList?.data?.products?.map((product, idx) => (
            <Col key={idx} sm={12} md={6} lg={4} xl={3} className="my-2">
              <Link to={`/products/${product._id}`}>
                <Product product={product} />
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Home
