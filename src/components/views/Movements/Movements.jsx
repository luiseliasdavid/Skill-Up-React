import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { balance } from "../../../redux/actions";
import { dateFormatter, currencyFormatter } from "../../../utils/formatters";
import MovementsPagination from "./MovementsPagination";

import "./Movements.styles.css";

const Movements = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state?.userData);

    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [transactionsToShow, setTransactionToShow] = useState([]);

    useEffect(() => {
        dispatch(balance());
    }, []);

    useEffect(() => {
        if (JSON.stringify(userData) != "{}") {
            setLoading(false);
            // Sort transactions
            const transactions = userData.transactions.topup.concat(
                userData.transactions.payments
            );
            transactions
                .sort((d1, d2) => new Date(d2.date) - new Date(d1.date))
                .pop();

            // Set ALL transactions
            setTransactions(transactions);

            // Set transactionsToShow
            setTransactionToShow(transactions.slice(0, TRANSACTIONS_PER_PAGE));
        }
    }, [userData]);

    /////////////////////////////////////////////PAGINATION
    ////////////// LOADER SKELETON
    const TRANSACTIONS_PER_PAGE = 3;
    const TOTAL_PAGES = Math.ceil(transactions.length / TRANSACTIONS_PER_PAGE);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePrev = () => {
        const index = currentPage > 1 ? currentPage - 1 : TOTAL_PAGES;
        setCurrentPage(index);
    };

    const handleNext = () => {
        const index = currentPage < TOTAL_PAGES ? currentPage + 1 : 1;
        setCurrentPage(index);
    };

    const switchPage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const initialIndex = (currentPage - 1) * TRANSACTIONS_PER_PAGE;
        const finalIndex = initialIndex + TRANSACTIONS_PER_PAGE;
        setTransactionToShow(transactions.slice(initialIndex, finalIndex));
    }, [currentPage]);

    return (
        <>
            <h2>Movimientos</h2>
            {!loading ? (
                <section className="movements">
                    <div>Total en cuenta: ${userData.balance.totalBalance}</div>
                    {transactionsToShow.length === 0 ? (
                        <div>No tiene movimientos en su cuenta aún.</div>
                    ) : (
                        <ul className="list-group">
                            {transactionsToShow?.map((transaction) => (
                                <li
                                    key={transaction.id}
                                    className="movement list-group-item"
                                >
                                    <div className="movement-left">
                                        <span className="movement-left-icon">
                                            <i className="fa-solid fa-money-check-dollar"></i>
                                        </span>
                                        <div className="movement-detail">
                                            <span className="form-text">
                                                {dateFormatter(
                                                    transaction.date
                                                )}
                                            </span>

                                            {transaction.type === "topup" ? (
                                                <span>Depósito</span>
                                            ) : (
                                                <span>Pago</span>
                                            )}

                                            <button className="badge text-bg-primary">
                                                Ver detalle
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            transaction.type === "topup"
                                                ? "text-success fw-semibold"
                                                : "text-danger fw-semibold"
                                        }
                                    >
                                        {transaction.type === "topup" ? (
                                            <span>+</span>
                                        ) : (
                                            <span>-</span>
                                        )}
                                        {currencyFormatter(transaction.amount)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <MovementsPagination
                        totalPages={TOTAL_PAGES}
                        currentPage={currentPage}
                        switchPage={switchPage}
                        prev={handlePrev}
                        next={handleNext}
                    />
                </section>
            ) : (
                <div>Cargando...</div>
            )}
        </>
    );
};

export default Movements;
