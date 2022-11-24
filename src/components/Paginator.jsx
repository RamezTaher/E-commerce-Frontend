import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginator = ({ pages, page, isAdmin = false, keyword = "" }) => {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x, idx) => (
                    <LinkContainer key={idx} to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}>
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};

export default Paginator;
