import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import FormWrapper from "../components/FormWrapper"

const Shipping = () => {
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [country, setCountry] = useState("")

  const handleSubmit = () => {}
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
            <Form.Label>ZipCode</Form.Label>
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
          <Button type="submit" variant="primary"></Button>
        </Form>
      </FormWrapper>
    </>
  )
}

export default Shipping
