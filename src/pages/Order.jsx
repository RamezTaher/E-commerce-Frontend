import axios from "axios";
import React, { useEffect } from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getOrder, putOrder } from "../redux/actions/ordersActions";
import { removeWhiteSpaces } from "../utils/removeWhiteSpaces";
import { API_URL } from "../constants/api";
import { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { RESET_ORDER } from "../constants/orderConstants";

const Order = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [isSdk, setIsSdk] = useState(false);

    const getOrderData = useSelector(state => state.getOrder);
    const { data, loading, error } = getOrderData;
    console.log(data);

    const putOrderData = useSelector(state => state.putOrder);
    const { success, loading: loadingPay, error: errorPay } = putOrderData;

    useEffect(() => {
        const integratePayPal = async () => {
            const { data: clientId } = await axios.get(`${API_URL}/api/config/paypal`);
            console.log(clientId);
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.onload = () => {
                setIsSdk(true);
            };
            document.body.appendChild(script);
        };

        if (!data || success) {
            dispatch({ type: RESET_ORDER });
            dispatch(getOrder(id));
        } else if (!data.isPaid) {
            !window.paypal && integratePayPal();
        } else {
            setIsSdk(true);
        }
    }, [dispatch, id, success, data]);

    const paymentHanler = paidRes => {
        console.log(paidRes);
        dispatch(putOrder(id, paidRes));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant={"danger"}>{error}</Message>
    ) : (
        <>
            <h1>Order {data?._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                {" "}
                                <span style={{ fontWeight: "bold" }}>Name: </span> {data?.user?.name}{" "}
                            </p>
                            <p>
                                <span style={{ fontWeight: "bold" }}>Email: </span>
                                <a href={`mailto:${data?.user?.email}`}>{data?.user?.email}</a>
                            </p>

                            <p>
                                <span style={{ fontWeight: "bold" }}>Address: </span>
                                {removeWhiteSpaces(data.shippingAddress.address)},{" "}
                                {removeWhiteSpaces(data.shippingAddress.city)},{" "}
                                {removeWhiteSpaces(data.shippingAddress.zipCode)},{" "}
                                {removeWhiteSpaces(data.shippingAddress.country)}
                            </p>

                            {data?.isPaid ? (
                                <Message variant={"success"}>Delivered on ${data?.deliveredAt}</Message>
                            ) : (
                                <Message variant="danger">Your Order isn't delivered yet</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                {" "}
                                <span style={{ fontWeight: "bold" }}>Method: </span> {data.paymentMethod}
                            </p>
                            {data?.isPaid ? (
                                <Message variant={"success"}>Paid on ${data?.paidAt}</Message>
                            ) : (
                                <Message variant="danger">You Need To Paid Your Order</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Items Ordered</h2>
                            {data.orderItems.length === 0 ? (
                                <Message>Empty Order</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {data?.orderItems.map((item, idx) => (
                                        <ListGroup.Item key={idx}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} x ${item.price} = $
                                                    {(item?.quantity * item?.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Orders</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${data.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${data.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${data.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${data.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!data?.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!isSdk ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton amount={data.totalPrice} onSuccess={paymentHanler} />
                                    )}
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>{error && <Message variant={"danger"}>{error}</Message>}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Order;
