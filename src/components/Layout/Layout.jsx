import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../views/auth/Login/Login";
import Register from "../views/auth/Register/Register";
import { NavBar } from "../NavBar/NavBar";
import Charge from "../views/Charge/Charge";
import Spents from "../views/Spents/Spents";
import Balance from "../views/Balance/Balance";
import Movements from "../views/Movements/Movements";
import Transfers from "../views/Transfers/Transfers";

const Error404 = lazy(() => import("../views/Error404/Error404"));

const Layout = () => {
  // Componente para envolver a las rutas privadas
  const RequireAuth = ({ children }) => {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login" replace={true} />;
    }
    return children;
  };

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

  return (
    <>
      <NavBar />
      <Header />

      <BrowserRouter>
        <AnimatePresence>
          <Routes>

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
        </AnimatePresence>
      </BrowserRouter>

      <Footer />
    </>
  );
};

export default Layout;
