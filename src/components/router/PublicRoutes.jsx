import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
    const { isLogged } = useSelector((store) => store.authReducer);
    const path = localStorage.getItem('lastPath') || '/home';
    
    return !isLogged ? <Outlet /> : <Navigate to={path} />;
};

export default PublicRoutes;