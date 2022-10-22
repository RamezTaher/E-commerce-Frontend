import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormWrapper from "../components/FormWrapper";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { product, putProduct } from "../redux/actions/productActions";
import { PUT_PRODUCT_RESET } from "../constants/productConstants";

const AdminModifyProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");

    const productDetailsData = useSelector(state => state.productDetails);
    const { loading, error, product: getProduct } = productDetailsData;

    const putProductData = useSelector(state => state.putProduct);
    const { error: putError, success: putSuccess } = putProductData;

    useEffect(() => {
        if (putSuccess) {
            dispatch({ type: PUT_PRODUCT_RESET });
            navigate("/admin/products");
        } else {
            if (!getProduct?.name || getProduct?._id !== id) {
                dispatch(product(id));
            } else {
                setName(getProduct.name);
                setPrice(getProduct.price);
                setImage(getProduct.image);
                setBrand(getProduct.brand);
                setCategory(getProduct.category);
                setCountInStock(getProduct.countInStock);
                setDescription(getProduct.description);
            }
        }
    }, [getProduct, dispatch, id, navigate, putSuccess]);

    const submitHandler = e => {
        e.preventDefault();
        dispatch(
            putProduct({
                _id: id,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            }),
        );
        dispatch({ type: PUT_PRODUCT_RESET });
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
                {putError && <Message variant={"danger"}>{putError}</Message>}

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
                                    type="number"
                                    min={0}
                                    placeholder="Enter Product Price"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="image" className="mb-2">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product Image Url"
                                    value={image}
                                    onChange={e => setImage(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="brand" className="mb-2">
                                <Form.Label>Product Brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product Brand"
                                    value={brand}
                                    onChange={e => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="countInStock" className="mb-2">
                                <Form.Label>Product Count In Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={0}
                                    placeholder="Enter Product Count In Stock"
                                    value={countInStock}
                                    onChange={e => setCountInStock(+e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="catagory" className="mb-2">
                                <Form.Label>Product Catagory</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product Catagory"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="description" className="mb-2">
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    type="text"
                                    placeholder="Enter Product Catagory"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                ></Form.Control>
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
