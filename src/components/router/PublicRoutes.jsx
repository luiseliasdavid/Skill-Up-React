 import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { userData } from "../../redux/actions";

const PublicRoutes = () => {

    

const data = useSelector((state) => state);
 const dispatch = useDispatch();

useEffect(() => {
    dispatch(userData(data.userData));
   
}, [dispatch]);



return(

    data?.userData  ? <Outlet/> :  <Navigate to="/home" />

)


}

export default PublicRoutes; 


 


  /*  import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = () => {
   return !localStorage.getItem("token") ? <Outlet /> : <Navigate to="/Home" />;
};

export default PublicRoutes;
       */