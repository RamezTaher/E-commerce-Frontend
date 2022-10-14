import React, { useState } from "react"
import { Button, Col, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { savePaymentMethod } from "../redux/actions/paymentActions"
import FormWrapper from "../components/FormWrapper"
import Steps from "../components/Steps"

const Payment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const shipping = useSelector((state) => state.shippingAddress)
  if (!shipping) {
    navigate("/shipping")
  }

  const payment = useSelector((state) => state.payment)

  const [paymentMethod, setPaymentMethod] = useState(payment.payementMethod)

  console.log(payment)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/orders")
  }
  return (
    <>
      <FormWrapper>
        <Steps step1 step2 step3 />
        <h1>Payment</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label as={"legend"}>Select Payment Method</Form.Label>
            <Col className="d-flex flex-column gap-2 py-4">
              <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                checked={paymentMethod === "Stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue The Proccess
          </Button>
        </Form>
      </FormWrapper>
    </>
  )
}

export default Payment
