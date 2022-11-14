import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";

import "./Layout.css";

import PrivateRoutes from "../router/PrivateRoutes";
import PublicRoutes from "../router/PublicRoutes";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Register from "../views/auth/Register/Register";
import Login from "../views/auth/Login/Login";
import Home from "../views/Home/Home";
import Charge from "../views/Charge/Charge";
import Spents from "../views/Spents/Spents";
import Balance from "../views/Balance/Balance";
import Movements from "../views/Movements/Movements";
import MovementDetail from "../views/Movements/MovementDetail";
import Transfers from "../views/Transfers/Transfers";

const Layout = () => {
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
        <BrowserRouter>
            <NavBar />
            <AnimatePresence>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route
                            path="/charge"
                            element={
                                <main>
                                    <motion.div
                                        className="page"
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={pageTransition}
                                    >
                                        <Charge />
                                    </motion.div>
                                </main>
                            }
                        />

                        <Route
                            path="/spents"
                            element={
                                <main>
                                    <motion.div
                                        className="page"
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={pageTransition}
                                    >
                                        <Spents />
                                    </motion.div>
                                </main>
                            }
                        />

                        <Route
                            path="/balance"
                            element={
                                <main>
                                    <motion.div
                                        className="page"
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={pageTransition}
                                    >
                                        <Balance />
                                    </motion.div>
                                </main>
                            }
                        />

                        <Route
                            path="/movements"
                            element={
                                <main>
                                    <motion.div
                                        className="page"
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={pageTransition}
                                    >
                                        <Movements />
                                    </motion.div>
                                </main>
                            }
                        />

                        <Route
                            path="/transfers"
                            element={
                                <main>
                                    <motion.div
                                        className="page"
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={pageTransition}
                                    >
                                        <Transfers />
                                    </motion.div>
                                </main>
                            }
                        />

                        <Route
                            path="/movements/:movementId"
                            element={
                                <main>
                                    <motion.div
                                        className="page"
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={pageTransition}
                                    >
                                        <MovementDetail />
                                    </motion.div>
                                </main>
                            }
                        />

                        <Route
                            path="/home"
                            exact
                            element={
                                <main>
                                    <motion.div
                                        className="page"
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={pageTransition}
                                    >
                                        <Home />
                                    </motion.div>
                                </main>
                            }
                        />

                        <Route
                            path="*"
                            element={
                                <main>
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
                                </main>
                            }
                        />
                    </Route>
                    <Route element={<PublicRoutes />}>
                        <Route
                            path="/register"
                            element={
                                <main>
                                    <motion.div
                                        className="page"
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={pageTransition}
                                    >
                                        <Register />
                                    </motion.div>
                                </main>
                            }
                        />

                        <Route
                            path="/"
                            exact
                            element={
                                <main>
                                    <motion.div
                                        className="page"
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={pageTransition}
                                    >
                                        <Login />
                                    </motion.div>
                                </main>
                            }
                        />

                        <Route
                            path="/"
                            exact
                            element={
                                <main>
                                    <motion.div
                                        className="page"
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={pageTransition}
                                    >
                                        <Login />
                                    </motion.div>
                                </main>
                            }
                        />

                        <Route
                            path="*"
                            element={
                                <main>
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
                                </main>
                            }
                        />
                    </Route>
                </Routes>
            </AnimatePresence>
            <Footer />
        </BrowserRouter>
    );
};

export default Layout;
