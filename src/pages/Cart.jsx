import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import Message from "../components/Message"
import { addToCart } from "../actions/cartActions"
import { useParams, useLocation } from "react-router-dom"

const Cart = () => {
  let { id } = useParams()

  const location = useLocation()

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  let quantity = location.search ? +location.search.split("=")[1] : 1

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity))
    }
  }, [dispatch, id, quantity])

  return (
    <>
      <h1 className="my-2">Cart</h1>
    </>
  )
}

export default Cart
