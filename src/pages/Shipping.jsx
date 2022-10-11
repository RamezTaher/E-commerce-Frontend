import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress } from "../actions/shippingActions"
import FormWrapper from "../components/FormWrapper"

const Shipping = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const shipping = useSelector((state) => state.shippingAddress)

  const [address, setAddress] = useState(shipping?.address)
  const [city, setCity] = useState(shipping?.city)
  const [zipCode, setZipCode] = useState(shipping?.zipCode)
  const [country, setCountry] = useState(shipping?.country)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, zipCode, country }))
    navigate("/payement")
  }
  return (
    <>
      <FormWrapper>
        <h1>Shipping</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="address" className="mb-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city" className="mb-2">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="zip" className="mb-2">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter The Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="zip" className="mb-2">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue The Proccess
          </Button>
        </Form>
      </FormWrapper>
    </>
  )
}

export default Shipping
