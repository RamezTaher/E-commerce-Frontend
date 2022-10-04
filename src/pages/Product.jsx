import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap"
import Rating from "../components/Rating"
import { useDispatch, useSelector } from "react-redux"
import { product } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
const Product = () => {
  const dispatch = useDispatch()

  let { id } = useParams()

  const productDetails = useSelector((state) => state.productDetails)

  const { loading, error, data } = productDetails

  useEffect(() => {
    dispatch(product(id))
  }, [dispatch, id])
  return (
    <>
      <Link className="btn btn-dark my-3" to={"/"}>
        {" "}
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">productsList.error</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={data?.image} alt={data?.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{data?.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={data?.rating}
                  text={`${data?.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${data?.price}</ListGroup.Item>
              <ListGroup.Item>Description: ${data?.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${data?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {data?.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn btn-block"
                    type="button"
                    disabled={data?.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default Product
