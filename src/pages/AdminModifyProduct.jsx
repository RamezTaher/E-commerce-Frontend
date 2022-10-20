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
    const [description, setDescription] = useState("");

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
            setDescription(getProduct.description);
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
                <h1>Modify Product</h1>
                {loading && <Loader />}
                {error && <Message variant={"danger"}>{error}</Message>}

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="name" className="mb-2">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="price" className="mb-2">
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product Price"
                                    value={price}
                                    onChange={e => setPrice(+e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="image" className="mb-2">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product Image Url"
                                    value={img}
                                    onChange={e => setImg(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="brand" className="mb-2">
                                <Form.Label>Product Brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product Brand "
                                    value={brand}
                                    onChange={e => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="countInStock" className="mb-2">
                                <Form.Label>Product Count In Stock</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product Count In Stock "
                                    value={countInStock}
                                    onChange={e => setCountInStock(+e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="catagory" className="mb-2">
                                <Form.Label>Product Catagory</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product Catagory "
                                    value={catagory}
                                    onChange={e => setCatagory(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="description" className="mb-2">
                                <Form.Label>Product Description</Form.Label>
                                <Form.Text
                                    type="text"
                                    placeholder="Enter Product Catagory "
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                ></Form.Text>
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
