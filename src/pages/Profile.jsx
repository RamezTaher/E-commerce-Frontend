import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../redux/actions/profileActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getAllOrders } from "../redux/actions/ordersActions";
import { LinkContainer } from "react-router-bootstrap";

const Profile = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profile = useSelector(state => state.profile);
    const { loading, error, user } = profile;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const profileUpdate = useSelector(state => state.profileUpdate);
    const { success } = profileUpdate;

    const getAllOrdersData = useSelector(state => state.getAllOrders);
    const { loading: loadingOrders, error: errorOrders, allOrders } = getAllOrdersData;

    const submitHandler = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(updateProfile({ id: user?._id, name, email, password }));
        }
    };

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            if (!user?.name) {
                dispatch(getProfile("profile"));
                dispatch(getAllOrders());
            } else {
                setName(user?.name);
                setEmail(user?.email);
            }
        }
    }, [dispatch, navigate, user, userInfo]);
    console.log(allOrders);

    return (
        <>
            <Row>
                <Col md={4}>
                    <h1>My Profile</h1>
                    {message && <Message variant={"danger"}>{message}</Message>}
                    {error && <Message variant={"danger"}>{error}</Message>}
                    {success && <Message variant={"success"}>Profile Updated Successfully</Message>}
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
                                Update Info
                            </Button>
                        </Form>
                    )}
                </Col>
                <Col md={8}>
                    <h1>Orders</h1>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant="danger">{errorOrders}</Message>
                    ) : (
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders.map((order, idx) => (
                                    <tr key={idx}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt?.substring(0, 10)}</td>
                                        <td>{order?.totalPrice}</td>
                                        <td>
                                            {order?.isPaid ? (
                                                order?.paidAt?.substring(0, 10)
                                            ) : (
                                                <i className="fas fa-times" style={{ color: "red" }}></i>
                                            )}
                                        </td>
                                        <td>
                                            {order?.isDelivered ? (
                                                order?.deliveredAt?.substring(0, 10)
                                            ) : (
                                                <i className="fas fa-times" style={{ color: "red" }}></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/orders/${order?._id}`}>
                                                <Button className="btn-sm" variant="light">
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default Profile;
