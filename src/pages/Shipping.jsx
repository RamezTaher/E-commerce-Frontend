import React, { useState } from "react"
import { FormWrapper } from "../components/FormWrapper"

const Shipping = () => {
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")
  const [country, setCountry] = useState("")
  return (
    <>
      <FormWrapper></FormWrapper>
    </>
  )
}

export default Shipping
