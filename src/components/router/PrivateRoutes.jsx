import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserAccount } from '../../redux/actions/accountActions';

const PrivateRoutes = () => {
    const dispatch = useDispatch();
    const { isLogged } = useSelector((store) => store.authReducer);
    isLogged && dispatch(getUserAccount());
    return isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;