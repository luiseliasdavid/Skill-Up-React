import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
    const { isLogged } = useSelector((store) => store.authReducer);
    return isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;