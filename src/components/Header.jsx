import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
    };

    const goTo = url => {
        navigate(url);
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">MyShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href="/cart">
                                <i className="fas fa-shopping-cart"></i> Cart
                            </Nav.Link>
                            {userInfo ? (
                                <NavDropdown className="mx-2" title={userInfo.name} id="username">
                                    <NavDropdown.Item onClick={() => goTo("/profile")}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link href="/login">
                                    <i className="fas fa-user"></i> Sign In
                                </Nav.Link>
                            )}
                            {userInfo && userInfo?.isAdmin && (
                                <NavDropdown className="mx-2" title={"admin"} id="Admin">
                                    <NavDropdown.Item onClick={() => goTo("admin/users")}>Users</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => goTo("admin/products")}>Products</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => goTo("admin/orders")}>Orders</NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
