import React from "react";

export const NavBar = ({ userName = "sinNombreDeUsuario" }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid ">
        <div id="nav-left-container">
          <a className="navbar-brand " href="#home">
            <img
              src={require("./assets/logo.png")}
              alt="brand-logo"
              /* Cambiar tamaños */ width="30"
              /* Cambiar tamaños */ height="24"
            />
            <span className="ms-2">{userName}</span>
          </a>
        </div>

        <div
          id="nav-right-container"
          className="collapse navbar-collapse d-flex justify-content-end"
        >
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Carga de saldo
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Gastos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Balance
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Movimientos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Envio de dinero
              </a>
            </li>
            {/* Hide if the user is login */}

            <li className="nav-item">
              <button
                type="button"
                className={`btn ${
                  userName === "" ? "btn-primary" : "btn-danger"
                }`}
              >
                {userName === "" ? "Login" : "LogOut"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
