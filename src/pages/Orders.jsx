import React from "react"
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Message from "../components/Message"
import Steps from "../components/Steps"

const Orders = () => {
  const dispatch = useDispatch()
  const shipping = useSelector((state) => state.shippingAddress)
  const payment = useSelector((state) => state.payment)
  const cart = useSelector((state) => state.cart)

  cart.cartItems.totalPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  cart.cartItems.shippingPrice = cart.cartItems.totalPrice > 200 ? 0 : 200
  cart.cartItems.tax = +(0.1 * cart.cartItems.totalPrice).toFixed(2)
  cart.cartItems.sum = (
    cart.cartItems.totalPrice +
    cart.cartItems.shippingPrice +
    cart.cartItems.tax
  ).toFixed(2)

  const handleOrder = (e) => {
    e.preventDefault()
  }
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
                  <Col>${cart.cartItems.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.cartItems.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.cartItems.tax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.cartItems.sum}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={handleOrder}
                >
                  Place Your Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Orders
