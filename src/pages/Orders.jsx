import React, { useEffect } from "react"
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Message from "../components/Message"
import Steps from "../components/Steps"
import { createOrder } from "../redux/actions/ordersActions"
import { removeWhiteSpaces } from "../utils/removeWhiteSpaces"

const Orders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const shipping = useSelector((state) => state.shippingAddress)
  const payment = useSelector((state) => state.payment)
  const cart = useSelector((state) => state.cart)
  const postOrder = useSelector((state) => state.createOrder)
  const { data, success, error } = postOrder

  cart.cartItems.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  cart.cartItems.shippingPrice = cart.cartItems.itemsPrice > 200 ? 0 : 200
  cart.cartItems.tax = +(0.1 * cart.cartItems.itemsPrice).toFixed(2)
  cart.cartItems.sum = +(
    cart.cartItems.itemsPrice +
    cart.cartItems.shippingPrice +
    cart.cartItems.tax
  ).toFixed(2)

  const handleOrder = (e) => {
    e.preventDefault()
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: shipping,
        paymentMethod: payment.payementMethod,
        itemsPrice: cart.cartItems.itemsPrice,
        shippingPrice: cart.cartItems.shippingPrice,
        taxPrice: cart.cartItems.tax,
        totalPrice: cart.cartItems.sum,
      })
    )
  }

  useEffect(() => {
    if (success) {
      navigate(`/orders/${data._id}`)
    }
  }, [navigate, success, data])

  return (
    <>
      <Steps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                Address: {removeWhiteSpaces(shipping.address)},{" "}
                {removeWhiteSpaces(shipping.city)},{" "}
                {removeWhiteSpaces(shipping.zipCode)},{" "}
                {removeWhiteSpaces(shipping.country)}
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
                  <Col>${cart.cartItems.itemsPrice.toFixed(2)}</Col>
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
                {error && <Message variant={"danger"}>{error}</Message>}
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
