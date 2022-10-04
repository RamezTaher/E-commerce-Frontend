import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({ product }) => {
  return (
    <Card className=" p-3 rounded card h-100">
      <Card.Img src={product.image} variant="top"></Card.Img>

      <Card.Body>
        <Card.Title as="div">
          <strong>{product.name}</strong>{" "}
        </Card.Title>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">
          <strong>${product.price}</strong>{" "}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
