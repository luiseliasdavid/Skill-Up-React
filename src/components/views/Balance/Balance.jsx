import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { balance, cleanStatusRequest, userData } from "../../../redux/actions";
import styles from "./styles.css";
import { GraphBalance } from "./GraphBalance";

const Balance = () => {
   const userInformation = useSelector((state) => state.userData);
   const request = useSelector((state) => state.statusRequest);

   console.log(userInformation);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const token = localStorage.getItem("token");

   useEffect(() => {
      if (token !== null) {
         // dispatch(userData());
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

                  <h3>Cargas realizadas: 3</h3>
                  <p>Total: ${userInformation.balance.topup}</p>

                  <h3>Cantidad de transferencias: 3</h3>
                  <p>Total: ${userInformation.balance.payments}</p>
                  <button className="btn btn-light">Volver al Home</button>
               </div>
               <div className="container-card">
                  <h2>Grafico de torta</h2>
                  <GraphBalance
                     topup={userInformation.balance.topup}
                     payments={userInformation.balance.payments}
                  />
               </div>
            </div>
         )}
      </div>
   );
};

export default Balance;

/*

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue'],
  datasets: [
    {
      label: 'Balance',
      data: [3000, 1500],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

export function App() {
  return <Doughnut data={data} />;
}
*/

/*

import React from "react";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["I", "II", "III", "IIII"],
  datasets: [
    {
      data: [500, 500, 500, 500],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      borderWidth: 2
    }
  ]
};
export default function App() {
  return <Doughnut data={data} />;
}

*/
