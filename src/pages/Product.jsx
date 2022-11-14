import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { product } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { postReview } from "../redux/actions/ReviewActions";
import { type } from "@testing-library/user-event/dist/type";
import { POST_REVIEW_RESET } from "../constants/reviewConstants";
const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product: data } = productDetails;

    const postReviewData = useSelector(state => state.postReview);
    const { error: reviewError, success: reviewSuccess } = postReviewData;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (reviewSuccess) {
            alert("Review Submitted");
            setComment("");
            setRating(0);
            dispatch({ type: POST_REVIEW_RESET });
        }
        dispatch(product(id));
    }, [dispatch, id, reviewSuccess]);

    const addToCart = () => {
        navigate(`/cart/${id}?quantity=${quantity}`);
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        dispatch(
            postReview(id, {
                rating,
                comment,
            }),
        );
    };

    return (
        <>
            <Link className="btn btn-dark my-3" to={"/"}>
                {" "}
                Go Back
            </Link>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div className="">
                    <Row>
                        <Col lg={6}>
                            <Image src={data?.image} alt={data?.name} fluid />
                        </Col>
                        <Col lg={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>{data?.name}</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={data?.rating} text={`${data?.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>Price: ${data?.price}</ListGroup.Item>
                                <ListGroup.Item>Description: {data?.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col lg={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${data?.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{data?.countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {data?.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Quantity</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={quantity}
                                                        onChange={e => setQuantity(e.target.value)}
                                                    >
                                                        {[...Array(data?.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCart}
                                            className="btn btn-block"
                                            type="button"
                                            disabled={data?.countInStock === 0}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col lg={6}>
                            <h2>Reviews</h2>
                            {data?.reviews.length === 0 && <Message>No Reviews Yet.</Message>}
                            <ListGroup variant="flush">
                                {data?.reviews?.map((review, idx) => (
                                    <ListGroup.Item key={idx}>
                                        <span>{review.name}</span>
                                        <Rating value={review?.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Leave a Review for us </h2>
                                    {reviewError && <Message variant="danger">{reviewError} </Message>}
                                    {userInfo ? (
                                        <Form onSubmit={handleFormSubmit}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={e => setRating(e.target.value)}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="1">1 - Poor</option>
                                                    <option value="2">2 - Fair</option>
                                                    <option value="3">3 - Good</option>
                                                    <option value="4">4 - Very Good</option>
                                                    <option value="5">5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={comment}
                                                    onChange={e => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button type="submit" variant="primary">
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>You need to be logged to leave a review</Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
};

export default Product;
