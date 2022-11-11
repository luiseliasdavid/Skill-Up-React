import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { balance, cleanStatusRequest, userData } from "../../../redux/actions";
import balanceStyles from "./balanceStyles.scss";

const Balance = () => {
   let data = useSelector((state) => state.userData);
   let request = useSelector((state) => state.statusRequest);

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
         <h1>balance</h1>
      </div>
   );
};

export default Balance;
