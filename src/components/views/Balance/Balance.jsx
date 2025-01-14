import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./balanceStyles.css";
import "./buttonStyles.css";

import Loader from "../../Loader/Loader";
import {GraphBalance} from "./GraphBalance";
import { getAllMovements } from "../../../redux/actions/transactionActions";
import { currencyFormatter } from "../../../utils/formatters";
import swal from "../../../utils/swal";

const Balance = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, balanceData, topupList, paymentList } = useSelector(
        (state) => state.transactionReducer
    );

    useEffect(() => {
        dispatch(getAllMovements()).then((res) => {
            const { status, error } = res;
            error &&
                swal("Hubo un error.", `Error ${status}: ${error}`, "error");
        });
    }, []);

    return (
        <div className="container">
            <h1>Balance General de tu Cuenta</h1>

            {loading ? (
                <Loader />
            ) : (
                <div className="balance">
                    <div className="container-card">
                        <h2>
                            Dinero en tu cuenta:{" "}
                            {currencyFormatter(balanceData?.totalBalance)}
                        </h2>

                        <hr className="shine" />

                        <h3>
                            Cargas realizadas:{" "}
                            {topupList.length}
                        </h3>
                        <p>
                            Total:{" "}
                            {currencyFormatter(balanceData?.topupBalance)}
                        </p>

                        <hr className="shine" />

                        <h3>
                            Cantidad de transferencias:{" "}
                            {paymentList.length}
                        </h3>
                        <p>
                            Total:{" "}
                            {currencyFormatter(balanceData?.paymentBalance)}
                        </p>
                        <button
                            className="btn-navigate"
                            onClick={() => navigate("/home")}
                        >
                            Volver al Home
                        </button>
                    </div>
                    <div className="container-card">
                        <h2>Gráfica</h2>
                        <GraphBalance
                            topup={balanceData?.topupBalance}
                            payments={balanceData?.paymentBalance}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Balance;