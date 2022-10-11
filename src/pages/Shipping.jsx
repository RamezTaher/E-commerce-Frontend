import React, { useState } from "react"
import { Form } from "react-bootstrap"
import  FormWrapper  from "../components/FormWrapper"

const Shipping = () => {
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")
  const [country, setCountry] = useState("")

  const handleSubmit=()=>{

  }
  return (
    <>
      <FormWrapper>
        <h1>Shipping</h1>
        <Form onSubmit={handleSubmit}></Form>
      </FormWrapper>
    </>
  )
}

export default Shipping
