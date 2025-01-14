import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./Movements.styles.css";

import { getAllMovements } from "../../../redux/actions/transactionActions";
import {
    dateFormatter,
    currencyFormatter,
    largeStringFormatter,
} from "../../../utils/formatters";
import swal from "../../../utils/swal";
import Pagination from "../../Pagination/Pagination";
import MovementsFilters from "./MovementsFilters";
import { Link } from "react-router-dom";

const Movements = () => {
    const dispatch = useDispatch();
    const { loading, balanceData, topupList, paymentList, transactionList } =
        useSelector((state) => state.transactionReducer);
    const { accountData } = useSelector((state) => state.accountReducer);

    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [transactionsToShow, setTransactionToShow] = useState([]);

    useEffect(() => {
        dispatch(getAllMovements()).then((res) => {
            const { status, error } = res;
            if (!error) {
                // Set filtered transactions
                setFilteredTransactions(res.transactionList);

                // Set transactions to show
                setTransactionToShow(
                    res.transactionList.slice(0, TRANSACTIONS_PER_PAGE)
                );
            } else {
                swal("Hubo un error.", `Error ${status}: ${error}`, "error");
            }
        });
    }, []);

    /* Pagination and filters */
    const TRANSACTIONS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(
        Math.ceil(transactionList.length / TRANSACTIONS_PER_PAGE)
    );

    const handlePrev = () => {
        const index = currentPage > 1 ? currentPage - 1 : totalPages;
        setCurrentPage(index);
    };

    const handleNext = () => {
        const index = currentPage < totalPages ? currentPage + 1 : 1;
        setCurrentPage(index);
    };

    const switchPage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const initialIndex = (currentPage - 1) * TRANSACTIONS_PER_PAGE;
        const finalIndex = initialIndex + TRANSACTIONS_PER_PAGE;
        setTransactionToShow(
            filteredTransactions.slice(initialIndex, finalIndex)
        );

        setTotalPages(
            Math.ceil(filteredTransactions.length / TRANSACTIONS_PER_PAGE)
        );
    }, [currentPage, filteredTransactions]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredTransactions]);

    return (
        <>
            <h1>Movimientos</h1>
            {!loading ? (
                <section className="movements">
                    {transactionList.length === 0 ? (
                        <div>No tiene movimientos en su cuenta aún.</div>
                    ) : (
                        <div className="d-flex flex-column  gap-3">
                            <div>
                                Total en cuenta: {currencyFormatter(balanceData?.totalBalance)}
                            </div>

                            <div className="dropdown-center">
                                <button
                                    className="btn btn-primary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Filtrar
                                </button>

                                <div className="dropdown-menu">
                                    <MovementsFilters
                                        transactions={transactionList}
                                        setFilteredTransactions={
                                            setFilteredTransactions
                                        }
                                    />
                                </div>
                            </div>

                            {transactionsToShow.length === 0 ? (
                                <div>Sin resultados.</div>
                            ) : (
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    switchPage={switchPage}
                                    prev={handlePrev}
                                    next={handleNext}
                                />
                            )}

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

                                                {largeStringFormatter(
                                                    transaction.concept,
                                                    10
                                                )}
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                transaction.type === "topup"
                                                    ? "text-success fw-semibold text-center"
                                                    : "text-danger fw-semibold text-center"
                                            }
                                        >
                                            <div>
                                                {transaction.type ===
                                                "topup" ? (
                                                    <span>Depósito</span>
                                                ) : (
                                                    <span>Pago</span>
                                                )}
                                            </div>

                                            <div>
                                                {transaction.type ===
                                                "topup" ? (
                                                    <span>+</span>
                                                ) : (
                                                    <span>-</span>
                                                )}
                                                {currencyFormatter(
                                                    transaction.amount
                                                )}
                                            </div>
                                        </div>

                                        <Link to={`/movements/${transaction.id}`}>
                                            <button className="badge text-bg-primary">
                                                Ver detalle
                                            </button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>
            ) : (
                <section className="movements">
                    <Skeleton
                        count={10}
                        width="326px"
                        height="125px"
                        style={{ marginBottom: "50px" }}
                    />
                </section>
            )}
        </>
    );
};

export default Movements;