import React, { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/actions/authActions"
import { Link, useLocation } from "react-router-dom"
import FormWrapper from "../components/FormWrapper"
import Message from "../components/Message"
import Loader from "../components/Loader"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const location = useLocation()
  const redirectPath = location.search ? location.search.split("=")[1] : "/"

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (userInfo) {
      window.location.href = redirectPath
    }
  }, [userInfo, redirectPath])
  return (
    <>
      <FormWrapper>
        <h1>Sign In</h1>
        {error && <Message variant={"danger"}>{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <>
            <Form onSubmit={submitHandler}>
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
              <Button type="submit" variant="primary">
                Sign In
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                New Customer ?{" "}
                <Link
                  to={
                    redirectPath === "/"
                      ? "/register"
                      : `/register?redirect=${redirectPath}`
                  }
                >
                  {" "}
                  Register
                </Link>
              </Col>
            </Row>
          </>
        )}
      </FormWrapper>
    </>
  )
}

export default Login
