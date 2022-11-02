import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../views/auth/Login/Login";
import Register from "../views/auth/Register/Register";

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
            <Header />

            <BrowserRouter>
                <AnimatePresence>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <motion.div
                                    className="page"
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={pageTransition}
                                >
                                    <Login />
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
                                    variants={pageTransition}
                                >
                                    <Register />
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
                                    variants={pageTransition}
                                >
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
