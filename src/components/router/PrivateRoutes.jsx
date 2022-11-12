 import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { userData } from "../../redux/actions";

const PrivateRoutes = () => {

const data = useSelector((state) => state);
 const dispatch = useDispatch();

useEffect(() => {
    dispatch(userData(data.userData));
}, [dispatch]);



return(

   data?.userData ? <Outlet/> :  <Navigate to="/login" />

)


}

export default PrivateRoutes; 
 



/*  import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
   return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/Home" />;
};

export default PrivateRoutes;
       */