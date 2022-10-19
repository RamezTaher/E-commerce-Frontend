import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormWrapper from "../components/FormWrapper";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authActions";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const AdminModifyUser = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const location = useLocation();
    const redirectPath = location.search ? location.search.split("=")[1] : "/";

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    const submitHandler = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(register(name, email, password));
        }
    };

    useEffect(() => {
        if (userInfo) {
            window.location.href = redirectPath;
        }
    }, [userInfo, redirectPath]);

    return (
        <>
            <FormWrapper>
                <h1>Register</h1>
                {message && <Message variant={"danger"}>{message}</Message>}
                {error && <Message variant={"danger"}>{error}</Message>}
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="name" className="mb-2">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email" className="mb-2">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password" className="mb-2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword" className="mb-2">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button type="submit" variant="primary">
                                Register
                            </Button>
                        </Form>

                        <Row className="py-3">
                            <Col>
                                Already member ?{" "}
                                <Link to={redirectPath === "/" ? "/login" : `/login?redirect=${redirectPath}`}>
                                    {" "}
                                    Login
                                </Link>
                            </Col>
                        </Row>
                    </>
                )}
            </FormWrapper>
        </>
    );
};

export default AdminModifyUser;
