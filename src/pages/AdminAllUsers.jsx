import React from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteUser, getAllUsers } from "../redux/actions/usersActions";

const AdminAllUsers = () => {
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.users);
    const { loading, error, users } = usersData;
    const deleteUsersData = useSelector(state => state.deleteUser);
    // Need To add a react toast 
    const { success:successDelete } = deleteUsersData;

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    console.log(users);

    const deleteHandler = id => {
        dispatch(deleteUser(id));
    };
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
                                    <LinkContainer to={`admin/users/${user._id}/modify`}>
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

export default AdminAllUsers;
