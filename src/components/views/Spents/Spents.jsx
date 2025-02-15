import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllMovements,
    updateSpentConcept,
} from "../../../redux/actions/transactionActions";

import { currencyFormatter, dateFormatter } from "../../../utils/formatters";

import toast from "../../../utils/toast";
import swal from "../../../utils/swal";
import Loader from "../../Loader/Loader";
import Pagination from "../../Pagination/Pagination";

const Spents = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.transactionReducer);

    const [spents, setSpents] = useState([]);
    const [spentsToShow, setSpentsToShow] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        dispatch(getAllMovements()).then((res) => {
            const { status, error } = res;
            if (!error) {
                setSpents(res.paymentList);
                setSpentsToShow(res.paymentList.slice(0, SPENTS_PER_PAGE));
            } else {
                swal("Hubo un error.", `Error ${status}: ${error}`, "error");
            }
        });
    }, []);

    const handleChange = (e) => {
        setSpents(
            spents.map((spent) =>
                spent.id === +e.target.id
                    ? { ...spent, concept: e.target.value }
                    : spent
            )
        );
    };

    const EditConcept = (id) => {
        setIsDisabled(false);

        const spentById = spents.find((payment) => payment.id === id);

        const updatedSpent = {
            amount: spentById.amount,
            concept: spentById.concept,
            date: spentById.date,
            type: spentById.type,
            accountId: spentById.accountId,
            userId: spentById.userId,
            to_account_id: spentById.to_account_id,
        };
        dispatch(updateSpentConcept(id, updatedSpent)).then((res) => {
            const { status, error } = res;
            if (!error) {
                toast(`Concepto Actualizado`, "success");
                setIsDisabled(true);
            } else {
                swal("Hubo un error.", `Error ${status}: ${error}`, "error");
            }
        });
    };

    /* Pagination */
    const SPENTS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(
        Math.ceil(spents.length / SPENTS_PER_PAGE)
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
        const initialIndex = (currentPage - 1) * SPENTS_PER_PAGE;
        const finalIndex = initialIndex + SPENTS_PER_PAGE;
        setSpentsToShow(spents.slice(initialIndex, finalIndex));

        setTotalPages(Math.ceil(spents.length / SPENTS_PER_PAGE));
    }, [currentPage, spents]);

    useEffect(() => {
        setCurrentPage(1);
    }, [spents]);

    return (
        <div className="container">
            <h1>Gastos</h1>

            {!loading && !spentsToShow.length && (
                <h3 className="text-center">No se han registrado gastos.</h3>
            )}

            {!loading && (
                <button onClick={() => setIsDisabled(!isDisabled)} className='btn btn-dark'>
                    {isDisabled ? "Habilitar edición" : "Deshabilitar edición"}
                </button>
            )}

            {loading ? (
                <Loader />
            ) : (
                <div className="d-flex flex-wrap justify-content-center align-items-center m-4">
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        switchPage={switchPage}
                        prev={handlePrev}
                        next={handleNext}
                    />
                    {spentsToShow.map((spent) => (
                        <table className="table table-sm" key={spent.id}>
                            <thead>
                                <tr>
                                    <th scope="col">Actualizar concepto</th>
                                    <th scope="col">Concepto</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <button
                                            onClick={() =>
                                                EditConcept(spent.id)
                                            }
                                            className="btn btn-info"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-upload"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td>
                                        <input
                                            id={spent.id}
                                            type="text"
                                            name="concept"
                                            value={spent.concept}
                                            placeholder={spent.concept}
                                            disabled={isDisabled}
                                            onChange={handleChange}
                                        />
                                    </td>

                                    <td>{currencyFormatter(spent.amount)}</td>
                                    <td>{dateFormatter(spent.createdAt)}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Spents;
