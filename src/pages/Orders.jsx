import React from "react"
import { Col, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Steps from "../components/Steps"

const Orders = () => {
  const dispatch = useDispatch()
  const shipping = useSelector((state) => state.shippingAddress)
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
              <p>
                
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default Orders
