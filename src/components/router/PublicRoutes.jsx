import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = () => {
    return !localStorage.getItem("token") ? (
        <Outlet />
    ) : (
        <Navigate to="/home" />
    );
};

export default PublicRoutes;
