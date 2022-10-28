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
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={idx}>
                                <td>{user?._id}</td>
                                <td>{user?.name}</td>
                                <td>
                                    <a href={`mailto:${user?.email}`}> {user?.email}</a>
                                </td>
                                <td>
                                    {user?.isAdmin ? (
                                        <i className="fas fa-check" style={{ color: "green" }}></i>
                                    ) : (
                                        <i className="fas fa-times" style={{ color: "red" }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/users/${user._id}/modify`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(user?._id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
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
