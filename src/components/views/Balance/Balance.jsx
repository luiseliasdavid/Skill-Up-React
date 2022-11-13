import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./balanceStyles.css";
import "./buttonStyles.css";

import { GraphBalance } from "./GraphBalance";
import { currencyFormatter } from "../../../utils/formatters";
import { getAllMovements } from "../../../redux/actions/transactionActions";

const Balance = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, balanceData, topupList, paymentList } =
        useSelector((state) => state.transactionReducer);

    useEffect(() => {
        dispatch(getAllMovements())
            .then(res => console.log(res))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container">
            <h1>Balance General de tu Cuenta</h1>

            {loading ? (
                "Loading..."
            ) : (
                <div className="balance">
                    <div className="container-card">
                        <h2>
                            Dinero en tu cuenta:{" "}
                            {currencyFormatter(balanceData?.totalBalance)}
                        </h2>

                        <hr className="shine" />

                        <h3>
                            Cargas realizadas:
                            {topupList.length}
                        </h3>
                        <p>
                            Total:
                            {currencyFormatter(balanceData?.topupBalance)}
                        </p>

                        <hr className="shine" />

                        <h3>
                            Cantidad de transferencias:
                            {paymentList.length}
                        </h3>
                        <p>
                            Total:
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
