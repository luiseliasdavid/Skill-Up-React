import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Footer from "../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";
import PrivateRoutes from "../router/PrivateRoutes";
import PublicRoutes from "../router/PublicRoutes";

const Layout = () => {
    // Componente para envolver a las rutas privadas

    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Header />
                <AnimatePresence>
                    {localStorage.getItem("token") ? (
                        <>
                            <PrivateRoutes />
                            <PublicRoutes />
                        </>
                    ) : (
                        <PublicRoutes />
                    )}
                </AnimatePresence>
            </BrowserRouter>
            <Footer />
        </>
    );
};

export default Layout;
