import React, { useState } from "react"
import { Button, Col, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress } from "../actions/shippingActions"
import FormWrapper from "../components/FormWrapper"
import Steps from "../components/Steps"

const Payement = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const shipping = useSelector((state) => state.shippingAddress)
  if (!shipping) {
    navigate("/shipping")
  }

  const [payementMethod, setPayementMethod] = useState("PayPal")

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/order")
  }
  return (
    <>
      <FormWrapper>
        <Steps step1 step2 step3></Steps>
        <h1>Payment</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label as={"legend"}>Select Payment Method</Form.Label>
          </Form.Group>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={payementMethod === "PayPal"}
              onChange={(e) => setPayementMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked={payementMethod === "Stripe"}
              onChange={(e) => setPayementMethod(e.target.value)}
            ></Form.Check>
          </Col>
          <Button type="submit" variant="primary">
            Continue The Proccess
          </Button>
        </Form>
      </FormWrapper>
    </>
  )
}

export default Payement
