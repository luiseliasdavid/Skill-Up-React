import React from "react";
import {Route, Routes} from "react-router-dom";
import {motion} from "framer-motion";
import Charge from "../views/Charge/Charge";
import Spents from "../views/Spents/Spents";
import Balance from "../views/Balance/Balance";
import Movements from "../views/Movements/Movements";
import Transfers from "../views/Transfers/Transfers";
import Register from "../views/auth/Register/Register";
import Login from "../views/auth/Login/Login";
import {lazy, Suspense} from "react";

const PrivateRoutes = () => {
  const pageTransition = {
    initial: {
      opacity: 0,
      x: "-100vw",
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      x: "-100vw",
      opacity: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const Error404 = lazy(() => import("../views/Error404/Error404"));

  return (
    <Routes>
      <Route
        path="/charge"
        element={
          <motion.div
            className="page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}>
            <Charge />
          </motion.div>
        }
      />

      <Route
        path="/spents"
        element={
          <motion.div
            className="page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}>
            <Spents />
          </motion.div>
        }
      />

      <Route
        path="/balance"
        element={
          <motion.div
            className="page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}>
            <Balance />
          </motion.div>
        }
      />

      <Route
        path="/movements"
        element={
          <motion.div
            className="page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}>
            <Movements />
          </motion.div>
        }
      />

      <Route
        path="/transfers"
        element={
          <motion.div
            className="page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}>
            <Transfers />
          </motion.div>
        }
      />

      <Route
        path="/register"
        element={
          <motion.div
            className="page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}>
            <Register />
          </motion.div>
        }
      />

      <Route
        path="/"
        element={
          <motion.div
            className="page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}>
            <Login />
          </motion.div>
        }
      />

      <Route
        path="*"
        element={
          <motion.div
            className="page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}>
            <Suspense fallback={<>...</>}>
              <Error404 />
            </Suspense>
          </motion.div>
        }
      />
    </Routes>
  );
};

export default PrivateRoutes;
