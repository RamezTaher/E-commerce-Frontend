import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { adminGetAllOrders } from "../redux/actions/ordersActions";
import { LinkContainer } from "react-router-bootstrap";

const AdminAllOrders = () => {
    const dispatch = useDispatch();

    const ordersData = useSelector(state => state.adminGetOrders);
    const { loading, error, allOrders } = ordersData;

    useEffect(() => {
        dispatch(adminGetAllOrders());
    }, [dispatch]);

    console.log(allOrders);

    return (
        <>
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders.map((order, idx) => (
                            <tr key={idx}>
                                <td>{order?._id}</td>
                                <td>{order?.user?.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order?.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i className="fas fa-times" style={{ color: "red" }}></i>
                                    )}
                                </td>
                                <td>
                                    {order?.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <i className="fas fa-times" style={{ color: "red" }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/orders/${order._id}`}>
                                        <Button variant="light" className="btn-sm">
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default AdminAllOrders;
