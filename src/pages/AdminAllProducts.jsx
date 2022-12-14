import React from "react";
import { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginator from "../components/Paginator";
import { POST_PRODUCT_RESET } from "../constants/productConstants";
import { deleteProduct, postProduct } from "../redux/actions/productActions";
import { products } from "../redux/actions/productsActions";

const AdminAllProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pageNumber } = useParams();

    const productsData = useSelector(state => state.productsList);
    const { loading, error, data } = productsData;
    console.log(loading);

    const deleteProductData = useSelector(state => state.deleteProduct);
    const { error: deleteError, success: deleteSuccess } = deleteProductData;

    const postProductData = useSelector(state => state.postProduct);
    const { error: postError, success: postSuccess, product: newProduct } = postProductData;

    useEffect(() => {
        dispatch({ type: POST_PRODUCT_RESET });
        if (postSuccess) {
            navigate(`/admin/products/${newProduct._id}/modify`);
        } else {
            dispatch(products("", pageNumber));
        }
    }, [dispatch, deleteSuccess, postSuccess, navigate, newProduct, pageNumber]);

    console.log(data);
    console.log(deleteSuccess);

    const deleteHandler = id => {
        // need to add a custom confirmation later on
        if (window.confirm("Are you sure to delete this user")) {
            dispatch(deleteProduct(id));
        }
    };

    const createNewProductHandler = () => {
        dispatch(postProduct());
    };
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

            {deleteError && <Message variant={"danger"}>{deleteError}</Message>}
            {postError && <Message variant={"danger"}>{postError}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
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
                            {data?.map((product, idx) => (
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
                    <Paginator pages={productsData?.pages} page={productsData?.page} isAdmin={true} />
                </>
            )}
        </>
    );
};

export default AdminAllProducts;
