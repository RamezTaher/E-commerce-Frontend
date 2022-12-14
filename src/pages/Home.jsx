import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { products } from "../redux/actions/productsActions";
import { Link } from "react-router-dom";
import Paginator from "../components/Paginator";

const Home = () => {
    const { keyword, pageNumber } = useParams();
    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productsList);
    console.log(pageNumber);

    useEffect(() => {
        dispatch(products(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <h1 className="my-2">The Lastest Products</h1>
            {productsList?.loading ? (
                <Loader />
            ) : productsList.error ? (
                <Message variant="danger">productsList.error</Message>
            ) : (
                <>
                    <Row>
                        {productsList?.data?.map((product, idx) => (
                            <Col key={idx} sm={12} md={6} lg={4} xl={3} className="my-2">
                                <Link to={`/products/${product._id}`}>
                                    <Product product={product} />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                    <Paginator pages={productsList?.pages} page={productsList?.page} keyword={keyword ? keyword : ""} />
                </>
            )}
        </>
    );
};

export default Home;
