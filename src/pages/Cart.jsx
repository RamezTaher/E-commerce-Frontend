import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import Message from "../components/Message"
import { addToCart, removeFromCart } from "../actions/cartActions"
import { useParams, useLocation } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"

const Cart = () => {
  let { id } = useParams()

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  let quantity = location.search ? +location.search.split("=")[1] : 1

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity))
    }
  }, [dispatch, id, quantity])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkout = () => {
    navigate("/login?redirect=shipping")
  }

  return (
    <>
      <Row>
        <Col md={8}>
          <h1 className="mb-4">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              You didn't buy any product yet.
              <Link to="/"> Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item?.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item?.image} alt={item?.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item?.product}`}>
                        {item?.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item?.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item?.quantity}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, +e.target.value))
                        }
                      >
                        {[...Array(item?.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + item?.quantity, 0)})
                  items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item?.quantity * item?.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems?.length === 0}
                  onClick={checkout}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Cart
