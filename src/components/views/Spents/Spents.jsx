import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { balance, updateSpentConcept, userData } from "../../../redux/actions";

import toast from "../../../utils/toast";

const Spents = () => {
  const data = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);
  const [paymentState, setPaymentState] = useState([]);

  useEffect(() => {
    dispatch(userData());
    dispatch(balance()).then((res) => {
      setPaymentState(res.paymentsList);
    });
  }, [dispatch]);

  const handleChange = (e) => {
    setPaymentState(
      paymentState.map((spent) =>
        spent.id === +e.target.id
          ? { ...spent, concept: e.target.value }
          : spent
      )
    );
  };

  const EditConcept = (id) => {
    setIsDisabled(!isDisabled);

    const spentById = paymentState.find((payment) => payment.id === id);

    const updateSpents = {
      amount: spentById.amount,
      concept: spentById.concept,
      date: spentById.date,
      type: spentById.type,
      accountId: spentById.accountId,
      userId: spentById.userId,
      to_account_id: spentById.to_account_id,
    };

    dispatch(updateSpentConcept(id, updateSpents)).then((res) => {
      const { status } = res.status;

      if (status === 200) {
        toast(`Concepto Actualizado`, "success");
        setIsDisabled(isDisabled);
      }
    });
  };

  return (
    <>
      {!data.transactions ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h2>Gastos</h2>

          <div className="d-flex flex-wrap align-items-center m-4">
            {paymentState.map((item) => (
              <table className="table table-sm" key={item.id}>
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
                        onClick={() => EditConcept(item.id)}
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
                        id={item.id}
                        type="text"
                        name="concept"
                        value={item.concept}
                        placeholder={item.concept}
                        disabled={isDisabled}
                        onChange={handleChange}
                      />
                    </td>
                    <td>{item.amount}</td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString("es-ES")}
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Spents;
