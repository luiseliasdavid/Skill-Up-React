import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanStatusRequest, createUser } from "../../../../redux/actions";


const Register = () => {
    let data = useSelector((state) => state.userData);
    let request = useSelector ( (state) => state.statusRequest );
 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if ( request.status === 200 ) {
            dispatch(cleanStatusRequest());
            navigate('/home')
        }
        if ( request.status === '0' ) return;
        if ( request.status !== 200 ) {
           alert(`${request.status} message: ${request.message}`)
           dispatch(cleanStatusRequest());
        }   
     }, [ dispatch, request, navigate ])  

    const crearUsuario = () => {
        console.log("hoola");
        dispatch(
           createUser({
              first_name: "dtogdfsssssop",
              last_name: "oaazahgfhobgss",
              email: "luis1000@luis1000.com",
              password: "123456",
              points: 0,
              roleId: 1,
           })
        );
        /* if( request.status === 200 ) return window.location.replace('http://localhost:3000/home');
        if (request.status === '0' ) alert('estado en 0');
        if ( request.status !== 200 ) return alert(`${request.message} ${request.status}`); */
     };

    return (
        <div>
            <button onClick={crearUsuario}>CREAR USER</button>
        </div>
    )
};

export default Register;
