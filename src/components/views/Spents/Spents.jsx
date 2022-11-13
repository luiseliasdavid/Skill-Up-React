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

const Spents = () => {
    const dispatch = useDispatch();

    const { loading, paymentList } = useSelector(
        (state) => state.transactionReducer
    );

    const [isDisabled, setIsDisabled] = useState(false);
    const [spents, setSpents] = useState([]);

    useEffect(() => {
        dispatch(getAllMovements()).then((res) => {
            const { status, error } = res;
            if (!error) {
                setSpents(res.paymentList);
            } else {
                swal("Hubo un error.", `Error ${status}: ${error}`, "error");
            }
        });
    }, []);

    const handleChange = (e) => {
        setSpents((prevState) => {
            const newState = prevState.map((spent) =>
                spent.id === e.target.id
                    ? { ...spent, concept: e.target.value }
                    : spent
            );
            return newState;
        });
    };

    const EditConcept = (id) => {
        setIsDisabled(!isDisabled);

        const currentSpent = spents.find((spent) => spent.id === id);

        const updatedSpent = {
            amount: currentSpent.amount,
            concept: currentSpent.concept,
            date: currentSpent.date,
            type: currentSpent.type,
            accountId: currentSpent.accountId,
            userId: currentSpent.userId,
            to_account_id: currentSpent.to_account_id,
        };

        dispatch(updateSpentConcept(id, updatedSpent)).then((res) => {
            const { status, error } = res;
            if (!error) {
                setSpents(paymentList);
            } else {
                swal("Hubo un error.", `Error ${status}: ${error}`, "error");
            }
        });
    };

    return (
        <div className="container">
            <h1>Gastos</h1>

            {loading ? (
                <Loader />
            ) : (
                <div className="d-flex flex-wrap align-items-center m-4">
                    {spents.map((spent) => (
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
