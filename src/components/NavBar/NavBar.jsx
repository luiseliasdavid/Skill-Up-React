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

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid ">
                    <div id="nav-left-container">
                        <Link
                            to={isLogged ? "/home" : "/"}
                            className="nav-link"
                        >
                            <img
                                src="/assets/img/logo.png"
                                alt="brand-logo"
                                /* Cambiar tamaños */ width="30"
                                /* Cambiar tamaños */ height="24"
                            />
                            <span className="ms-2 text-capitalize nav-item">
                                {isLogged && firstName
                                    ? `¡Bienvenido ${firstName}!`
                                    : "¡Bienvenido!"}
                            </span>
                        </Link>
                    </div>

                    <div
                        id="nav-right-container"
                        className="collapse navbar-collapse d-flex justify-content-end"
                    >
                        {!isLogged ? (
                            <div>
                                <Link to="/">
                                    <button className="btn btn-primary">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button className="btn btn-warning ms-3">
                                        Register
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <ul className="navbar-nav">
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
                                <Link to="/">
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-danger"
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                    </button>
                                </Link>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
