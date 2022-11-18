import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/actions/authActions";

const Navbar = () => {
    const dispatch = useDispatch();

    const { isLogged, userData } = useSelector((state) => state.authReducer);
    const firstName = userData.first_name;

    const handleLogout = () => {
        dispatch(logout());
    };
    
    return isLogged ? (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid d-flex justify-content-between">
                    <Link to="/home" className="navbar-brand">
                        <img
                            src="/assets/img/logo.png"
                            alt="brand-logo"
                            width="30"
                            height="24"
                        />
                        <span className="ms-2 text-capitalize nav-item">
                            ¡Bienvenido {firstName}!
                        </span>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center gap-3 w-100 justify-content-center">
                            <li className="nav-item">
                                <Link to="/charge" className="nav-link">
                                    Carga de saldo
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/spents" className="nav-link">
                                    Gastos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/balance" className="nav-link">
                                    Balance
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/movements" className="nav-link">
                                    Movimientos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/transfers" className="nav-link">
                                    Envio de dinero
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Link to="/">
                        <button
                            onClick={handleLogout}
                            className="btn btn-danger"
                        >
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </Link>
                </div>
            </nav>
        </header>
    ) : (
        <header>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid d-flex justify-content-between">
                    <Link to="/" className="navbar-brand">
                        <img
                            src="/assets/img/logo.png"
                            alt="brand-logo"
                            width="30"
                            height="24"
                        />
                        <span className="ms-2 text-capitalize nav-item">
                            ¡Bienvenido a AlkyBank!
                        </span>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center gap-3 w-100 justify-content-end">
                            <li className="nav-item">
                                <Link to="/">
                                    <button className="btn btn-primary">
                                        Ingresa
                                    </button>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/register">
                                    <button className="btn btn-warning ms-3">
                                        Registrate
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
