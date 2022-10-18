import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
