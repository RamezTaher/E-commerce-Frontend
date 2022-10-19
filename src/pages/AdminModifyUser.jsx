import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormWrapper from "../components/FormWrapper";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authActions";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

const AdminModifyUser = () => {
    const { id } = useParams();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();

    const userData = useSelector(state => state.profile);
    const { loading, error, user } = userData;

    const submitHandler = e => {
        e.preventDefault();
    };

    useEffect(() => {}, []);

    return (
        <>
            <Link to="/admin/users" className="btn btn-dark my-3">
                Go Back
            </Link>
            <FormWrapper>
                <h1>Modify User</h1>
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
                            <Form.Group controlId="isAdmin" className="mb-2">
                                <Form.Check
                                    type="checkbox"
                                    label="Make It Admin"
                                    checked={isAdmin}
                                    onChange={e => setIsAdmin(e.target.checked)}
                                ></Form.Check>
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Confirm
                            </Button>
                        </Form>
                    </>
                )}
            </FormWrapper>
        </>
    );
};

export default AdminModifyUser;
