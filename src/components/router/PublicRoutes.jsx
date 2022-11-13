import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
    const { isLogged } = useSelector((store) => store.authReducer);

    return !isLogged ? <Outlet /> : <Navigate to="/home" />;
};

export default PublicRoutes;
