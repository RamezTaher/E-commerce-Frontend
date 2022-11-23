import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const onSubmitHandler = e => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate("/");
        }
    };
    return (
        <>
            <Form className="d-flex " onSubmit={onSubmitHandler}>
                <Form.Control
                    type="text"
                    name="q"
                    onChange={e => setKeyword(e.target.value)}
                    placeholder="Search Products..."
                    className="mr-sm-2 ml-sm-5"
                ></Form.Control>
                <Button type="submit" variant="outline-success" className="px-4 mx-1">
                    {" "}
                    Search{" "}
                </Button>
            </Form>
        </>
    );
};

export default Search;
