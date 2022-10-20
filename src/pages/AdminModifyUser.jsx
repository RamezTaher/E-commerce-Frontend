import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormWrapper from "../components/FormWrapper";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { getProfile } from "../redux/actions/profileActions";
import { UPDATE_USER_RESET } from "../constants/users";
import { updateUser } from "../redux/actions/usersActions";

const AdminModifyUser = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const userData = useSelector(state => state.profile);
    const { loading, error, user } = userData;

    const userUpdateData = useSelector(state => state.updateUser);
    const { loading: updateLoading, error: updateError, success: updateSuccess } = userUpdateData;

    const submitHandler = e => {
        e.preventDefault();
        dispatch(updateUser({ _id: id, name, email, isAdmin }));
    };

    useEffect(() => {
        if (updateSuccess) {
            dispatch({ type: UPDATE_USER_RESET });
            // Need To add to toast success here
            navigate("/admin/users");
        } else {
            if (!user.name || user._id !== id) {
                dispatch(getProfile(id));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [user, dispatch, id, updateSuccess, navigate]);

    return (
        <>
            <Link to="/admin/users" className="btn btn-dark my-3">
                Go Back
            </Link>
            <FormWrapper>
                <h1>Modify User</h1>
                {updateLoading && <Loader />}
                {updateError && <Message variant={"danger"}>{updateError}</Message>}
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
                                    label={"Is Admin "}
                                    checked={isAdmin}
                                    onChange={e => setIsAdmin(e.target.checked)}
                                ></Form.Check>
                            </Form.Group>

                            <Button type="submit" variant="primary" onClick={() => submitHandler}>
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
