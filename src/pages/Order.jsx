import React, { useEffect } from "react"
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Steps from "../components/Steps"
import { getOrder } from "../redux/actions/ordersActions"
import { removeWhiteSpaces } from "../utils/removeWhiteSpaces"

const Order = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { id } = useParams()

  const getOrderData = useSelector((state) => state.getOrder)

  const { data, loading, error } = getOrderData

  useEffect(() => {
    dispatch(getOrder())
  }, [])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant={"danger"}>{error}</Message>
  ) : (
    <>
      <h1>Order {data._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                Address:{" "}
                {removeWhiteSpaces(data.shippingshippingAddress.address)},{" "}
                {removeWhiteSpaces(data.shippingAddress.city)},{" "}
                {removeWhiteSpaces(data.shippingAddress.zipCode)},{" "}
                {removeWhiteSpaces(data.shippingAddress.country)}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              <p>Method: {data.payementMethod}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Orders</h2>
              {data.orderItems.length === 0 ? (
                <Message>Empty Order</Message>
              ) : (
                <ListGroup variant="flush">
                  {data.orderItems.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {(item.quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Orders</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${data.orderItems.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${data.orderItems.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${data.orderItems.tax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${data.orderItems.sum}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant={"danger"}>{error}</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Order
