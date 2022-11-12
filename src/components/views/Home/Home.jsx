import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { balance } from "../../../redux/actions";
import { userData } from "../../../redux/actions";
import { dateFormatter } from "../../../utils/formatters";
import { currencyFormatter } from "../../../utils/formatters";

const Home = () => {
    let data = useSelector((state) => state);
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);
    const [hide, setHide] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    let request = useSelector((state) => state.statusRequest);

    const handleHide = () => {
        setHide(!hide);
    };

    useEffect(() => {
        dispatch(userData());
    }, []);

    useEffect(() => {
        dispatch(balance()).then(() => {setValue(data.userData.balance?.totalBalance)})
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            balance(
                setTransactions(
                    data?.userData?.transactions?.topup
                        .concat(data?.userData?.transactions?.payments)
                        .sort((d1, d2) => new Date(d2.date) - new Date(d1.date))
                )
            )
        );
    }, [
        dispatch,
        data?.userData?.transactions?.topup,
        data?.userData?.transactions?.payments,
    ]);

    return (
        <div className={`container mt-5 ${styles.bgColor}`}>
            <div className="row vh-100">
                <div className="col-4 d-flex flex-column align-items-center justify-content-evenly ">
                    <div className={`card w-75 ${styles.cardHeightLeft} `}>
                        <p className="mt-2">Available money</p>
                        <h2 className="mt-2">
                            {hide ? currencyFormatter(value) : "$ ******"}
                        </h2>
                        <button
                            className="btn btn-primary "
                            onClick={handleHide}
                        >
                            {hide ? "hide" : "show"}
                        </button>
                    </div>

                    <div
                        className={`card w-75 d-flex flex-column justify-content-center ${styles.cardHeightLeft}`}
                    >
                        <span>Recomendá la App y ganá!</span>
                        <hr />
                        <span>Recargá crédito en tu SUBE y tu celular</span>
                    </div>

                    <div
                        className={`card w-75 p-3  d-flex justify-content-center ${styles.cardHeightLeft}`}
                    >
                        <img src={"/assets/img/alkemy_logo.svg"} alt="" />
                    </div>
                    <div
                        className={`card w-75 ${styles.regret} d-flex justify-content-center margin-auto flex-row  align-items-center`}
                    >
                        <span className={`styles.`}>Regret button</span>
                    </div>
                </div>
                <div className="col-8 text-center  d-flex justify-content-center align-items-center flex-column">
                    <div className={`card w-75  ${styles.cardHeight}`}>
                        <h5 className="bg-info ">Last movements</h5>

                        {!loading ? (
                            transactions !== [] ? (
                                transactions?.slice(0, 5)?.map((money) => (
                                    <div
                                        key={money.id}
                                        className="card-body position-relative "
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
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
