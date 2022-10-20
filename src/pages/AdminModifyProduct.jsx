import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormWrapper from "../components/FormWrapper";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { product } from "../redux/actions/productActions";

const AdminModifyProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [brand, setBrand] = useState("");
    const [catagory, setCatagory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [discription, setDiscription] = useState("");

    const productDetailsData = useSelector(state => state.productDetails);
    const { loading, error, product: getProduct } = productDetailsData;

    useEffect(() => {
        if (!product.name || getProduct._id !== id) {
            dispatch(product(id));
        } else {
            setName(getProduct.email);
            setPrice(getProduct.price);
            setImg(getProduct.img);
            setBrand(getProduct.brand);
            setCatagory(getProduct.catagory);
            setCountInStock(getProduct.countInStock);
            setDiscription(getProduct.discription);
        }
    }, [getProduct, dispatch, id, navigate]);

    const submitHandler = e => {
        e.preventDefault();
    };

    return (
        <>
            <Link to="/admin/products" className="btn btn-dark my-3">
                Go Back
            </Link>
            <FormWrapper>
                <h1>Modify User</h1>
                {loading && <Loader />}
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

export default AdminModifyProduct;
