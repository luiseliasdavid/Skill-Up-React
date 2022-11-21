import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getUserAccount } from '../../redux/actions/accountActions';

const PrivateRoutes = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("lastPath", location.pathname);
    }, [])

    const { isLogged } = useSelector((store) => store.authReducer);
    isLogged && dispatch(getUserAccount());

    return isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;