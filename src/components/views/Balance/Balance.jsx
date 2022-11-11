import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { balance, cleanStatusRequest, userData } from "../../../redux/actions";
import balanceStyles from "./balanceStyles.css";
import buttonStyles from "./buttonStyles.css";
import { GraphBalance } from "./GraphBalance";

const Balance = () => {
   const userInformation = useSelector((state) => state.userData);
   const request = useSelector((state) => state.statusRequest);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const token = localStorage.getItem("token");

   useEffect(() => {
      if (token !== null) {
         dispatch(userData());
         dispatch(balance());
      } else {
         navigate("/login");
      }
   }, [dispatch, token, navigate]);

   useEffect(() => {
      if (request.status === 200) {
         dispatch(cleanStatusRequest());
      }
      if (request.status === "0") return;
      if (request.status !== 200) {
         alert(`error al buscar el balance`);
         dispatch(cleanStatusRequest());
      }
   }, [dispatch, request]);

   return (
      <div className="container">
         <h1>Balance General de tu Cuenta</h1>

         {!userInformation.balance ? (
            "Loading..."
         ) : (
            <div className="balance">
               <div className="container-card">
                  <h2>
                     Dinero en tu cuenta: $
                     {userInformation.balance.totalBalance}
                  </h2>

                  <hr className="shine" />

                  <h3>
                     Cargas realizadas:{" "}
                     {userInformation.transactions.topup.length}
                  </h3>
                  <p>Total: ${userInformation.balance.topup}</p>

                  <hr className="shine" />

                  <h3>
                     Cantidad de transferencias:{" "}
                     {userInformation.transactions.payments.length}
                  </h3>
                  <p>Total: ${userInformation.balance.payments}</p>
                  <button onClick={() => navigate("/home")}>
                     Volver al Home
                  </button>
               </div>
               <div className="container-card">
                  <h2>Gráfica</h2>
                  <GraphBalance
                     topup={userInformation.balance.topup}
                     payments={userInformation.balance.payments}
                  />
               </div>
            </div>
         )}

         {!userInformation.balance ? <></> : ""}
      </div>
   );
};

export default Balance;
