import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./Home.module.scss";

import {
    dateFormatter,
    currencyFormatter,
    hideNumbersFormatter,
} from "../../../utils/formatters";
import { getMovements } from "../../../redux/actions/transactionActions";
import { getUserAccount } from "../../../redux/actions/accountActions";

const Home = () => {
    const dispatch = useDispatch();

    const [hide, setHide] = useState(false);

    const toggleHide = () => {
        setHide(!hide);
    };

    useEffect(() => {
        dispatch(getMovements());
    }, []);

    const { accountData } = useSelector((store) => store.accountReducer);
    const { transactionList, loading } = useSelector(
        (store) => store.transactionReducer
    );
    const money = currencyFormatter(accountData.money);

    return (
        <div
            className={` ${styles.bgColor} container-fluid-lg`}
        >
          <h1 className={`${styles.title} pt-3 text-white`}>Bienvenidos a AlkyBank!</h1>
            <div className="row vh-100">
                <div className="col-12 col-md-4  d-md-flex d-flex flex-column align-items-center justify-content-md-evenly justify-content-start pt-5 ">
                    <div className={`card w-75  ${styles.cardHeightLeft} `}>
                        <p className="mt-2">Dinero disponible</p>
                        <h2 className="mt-2">
                            {hide ? money : hideNumbersFormatter(money)}
                        </h2>
                        <button
                            className={`btn btn-primary`}
                            onClick={toggleHide}
                        >
                            {hide ? "ocultar" : "mostrar"}
                        </button>
                    </div>

                    <div
                        className={`card w-75  d-flex flex-column justify-content-center d-none d-md-flex ${styles.cardHeightLeft} ${styles.font} `}
                    >
                        <span>Recargá crédito en tu SUBE</span>
                        <hr />
                        <span>Recomendá la App y ganá! </span> 
                    </div>

                    

                    <div
                        className={`card w-75 p-3 d-flex justify-content-center d-none d-md-flex ${styles.cardHeightLeft}`}
                    >
                        <img src={"./assets/img/alkemy_logo.svg"} alt="" />
                    </div>
                    <div
                        className={`card w-75 ${styles.regret} d-flex justify-content-center margin-auto flex-row d-none d-md-flex  align-items-center`}
                    >
                        <span className={`styles.`}>Botón de arrepentimiento</span>
                    </div>
                </div>
                <div className={`col-12 col-md-8 text-center d-flex justify-content-center align-items-center flex-column `}>
                    <div
                        className={`card w-75  ${styles.cardHeight} overflow-auto ${styles.boxShadow} `}
                    >
                        <h5 className={`bg-info p-2 border-2  `}>Últimos movimientos</h5>

                        {!loading ? (
                            transactionList !== [] ? (
                                transactionList?.slice(0, 5)?.map((money) => (
                                    <div
                                        key={money.id}
                                        className="card-body position-relative"
                                    >
                                        <li
                                            className={`list-group-item border border-black rounded ${styles.listCard}`}
                                        >
                                            <p>
                                                {currencyFormatter(
                                                    money.amount
                                                )}
                                            </p>
                                            <p>Concept: {money.concept}</p>
                                            <p>
                                                Date:{" "}
                                                {dateFormatter(money.date)}
                                            </p>
                                        </li>
                                    </div>
                                ))
                            ) : (
                                <p>Todavía no hay movimientos en la cuenta</p>
                            )
                        ) : (
                            <Skeleton
                                count={5}
                                width="600px"
                                borderRadius="0.5rem"
                                height="100px"
                                style={{ marginBottom: "50px" }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Home;
