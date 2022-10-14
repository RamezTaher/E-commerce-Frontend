import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Col, Row, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import { useDispatch, useSelector } from "react-redux"
import { product } from "../redux/actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
const Product = () => {
  let { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, data } = productDetails

  useEffect(() => {
    dispatch(product(id))
  }, [dispatch, id])

  const addToCart = () => {
    navigate(`/cart/${id}?quantity=${quantity}`)
  }

  return (
    <>
      <Link className="btn btn-dark my-3" to={"/"}>
        {" "}
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col lg={6}>
            <Image src={data?.image} alt={data?.name} fluid />
          </Col>
          <Col lg={3}>
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
              <ListGroup.Item>Description: {data?.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={3}>
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

                {data?.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          {[...Array(data?.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCart}
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
