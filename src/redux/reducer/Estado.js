import React, { useEffect } from "react";
import {
   createUser,
   login,
   logout,
   addMoneyToAccount,
   balance,
   getAllUsersWithAccount,
   sendMoneyToUser,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";

export const Estado = () => {
   // El 'useEffect' en el componente Login era el que borraba el token
   // del localStorage.

   // Ahora queda solucionar que al recargar la pagina no se pierdan los datos
   // que tenemos en el store.

   let data = useSelector((state) => state);

   const dispatch = useDispatch();

   /* useEffect(() => {
 if(data){
 console.log(data)}
//result 11-3-2022   // necesitamos esto -> "2022-10-26 10:00:00"
}, [ data ]) */

   const crearUsuario = () => {
      console.log("hoola");
      dispatch(
         createUser({
            first_name: "dtobiasssssop",
            last_name: "oaazavaobgss",
            email: "accczaaaobg@ail.com",
            password: "123456",
            points: 0,
            roleId: 1,
         })
      );
   };
   const log = () => {
      dispatch(
         login({
            email: "accczaaaobg@ail.com",
            password: "123456",
         })
      );
   };

   const cargasaldo = () => {
      dispatch(addMoneyToAccount(500, data.userData.account.id));
   };

   const balanceview = () => {
      dispatch(balance());
   };

   const userLogout = () => {
      dispatch(logout());
   };
   const consoleEstate = () => {
      console.log(data);
      console.log(JSON.parse(localStorage.getItem("user")));
      if (data.userdata) {
         console.log(JSON.parse(localStorage.getItem("user")).id);
      }
   };

   const getAccountListAndUserList = () => {
      dispatch(getAllUsersWithAccount());
   };

   const mandarDineroAmigo = () => {
      dispatch(sendMoneyToUser(7, 100,'pago de los botines', 
               data.userData.account.money, data.userData.account.id, data.userData.id ));
   }
   /* const crearCuenta =()=> {
  dispatch(createAccount(67))
} */
   return (
      <div>
         <button onClick={consoleEstate}>Console.log estado</button>
         <button onClick={crearUsuario}>crear usuario </button>
         <button onClick={log}>login</button>
         <button onClick={cargasaldo}>CARGAR SALDO</button>
         <button onClick={balanceview}>BALANCE</button>
         <button onClick={userLogout}>LOGOUT</button>
         <button onClick={mandarDineroAmigo}>Enviar DINERO FRIEND</button>
         <button onClick={getAccountListAndUserList}>
            TRAER LIST DE USER AND ACCOUNTS
         </button>
      </div>
   );
};





/* const token = localStorage.getItem("token");
    useEffect(() => {
        if ( token !== null ) {
            dispatch( userData() )
        } else {
            navigate('/register')
        }
    }, [dispatch, token, navigate ])  */