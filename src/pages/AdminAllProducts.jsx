import React from "react";
import { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteProduct } from "../redux/actions/productActions";
import { products } from "../redux/actions/productsActions";

const AdminAllProducts = () => {
    const dispatch = useDispatch();
    const productsData = useSelector(state => state.productsList);
    const { loading, error, data } = productsData;
    console.log(loading);

    const deleteProductData = useSelector(state => state.productsList);
    const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = deleteProductData;

    useEffect(() => {
        dispatch(products());
    }, [dispatch, deleteSuccess]);

    console.log(data);

    const deleteHandler = id => {
        // need to add a custom confirmation later on
        if (window.confirm("Are you sure to delete this user")) {
            dispatch(deleteProduct(id));
        }
    };

    const createNewProductHandler = () => {};
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button className="my-3" onClick={createNewProductHandler}>
                        <i className="fas fa-plus"></i>
                        Create New Product{" "}
                    </Button>
                </Col>
            </Row>
            {deleteLoading && <Loader />}
            {deleteError && <Message variant={"danger"}>{deleteError}</Message>}
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
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.products?.map((product, idx) => (
                            <tr key={idx}>
                                <td>{product?._id}</td>
                                <td>{product?.name}</td>
                                <td>${product?.price}</td>
                                <td>{product?.category}</td>
                                <td>{product?.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/products/${product?._id}/modify`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(product?._id)}
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

export default AdminAllProducts;
