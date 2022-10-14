import React from "react"
import { Col, Image, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Message from "../components/Message"
import Steps from "../components/Steps"

const Orders = () => {
  const dispatch = useDispatch()
  const shipping = useSelector((state) => state.shippingAddress)
  const payment = useSelector((state) => state.payment)
  const cart = useSelector((state) => state.cart)
  return (
    <>
      <Steps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                Address: {shipping.address},{shipping.city},{shipping.zipCode}{" "}
                {shipping.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              <p>Method: {payment.payementMethod}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Orders</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Add Items to your Cart</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row>
                        <Col md={1}>
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
      </Row>
    </>
  )
}

export default Orders
