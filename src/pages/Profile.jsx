import React, { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import Message from "../components/Message"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../actions/profileActions"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

const Profile = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const profile = useSelector((state) => state.profile)
  const { loading, error, user } = profile

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      //  dispatch
    }
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    } else {
      if (!user?.name) {
        dispatch(getProfile("profile"))
      } else {
        setName(user?.name)
        setEmail(user?.email)
      }
    }
  }, [dispatch, navigate, user])

  return (
    <>
      <Row>
        <Col lg={4}>
          <h1>My Profile</h1>
          {message && <Message variant={"danger"}>{message}</Message>}
          {error && <Message variant={"danger"}>{error}</Message>}
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email" className="mb-2">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password" className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mb-2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Update Info
              </Button>
            </Form>
          )}
        </Col>
        <Col lg={8}>
          <h1>Orders</h1>
        </Col>
      </Row>
    </>
  )
}

export default Profile
