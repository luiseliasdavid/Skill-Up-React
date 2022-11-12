import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { balance, updateSpentConcept, userData } from "../../../redux/actions";

import swal from "../../../utils/swal";

const Spents = () => {
  const data = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [newConcept, setNewConcept] = useState('');

  useEffect(() => {
    dispatch(userData());
    dispatch(balance());
    setUpdateData(data.transactions);
  }, [dispatch]);

  //console.log(updateData);

  const handleChange = (e) => {
    setNewConcept( prev => [e.target.name]: e.target.value);
  };

  //crear funcion que envie un ok o un error para facilitar la funcion de redux

  const EditConcept = (id) => {
    setIsDisabled(!isDisabled);
    console.log(id);

    const prueba = updateData.payments.find((payment) => payment.id === id);
    setNewConcept(prueba)
    console.log(prueba);

    const updateSpents = {
      amount: "",
      concept: "Pago de honorarios",
      date: "2022-10-26 15:00:00",
      type: "topup|payment",
      accountId: 1,
      userId: 4,
      to_account_id: 5,
    };

    dispatch(updateSpentConcept(id))
      .then((res) => {
        const { status } = res;

        /* if (status.status !== 200) {
          swal(
            "Hubo un error.",
            `Detalle del error: ${status.message}`,
            "error"
          );
        } else {
          //setIsDisabled(isDisabled);
        } */
      })
      .catch((err) => {
        /* swal(
          "Hubo un error inesperado. Recarga la página e intenta nuevamente.",
          "",
          "error"
        ); */
        console.log(err);
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
            {data.transactions.payments?.map((item) => (
              <table className="table table-sm" key={item.id}>
                <thead>
                  <tr>
                    <th scope="col">Button</th>
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
                        Editar Concepto
                      </button>
                    </td>
                    <td>
                      <input
                        type="text"
                        name={item.id}
                        value={newConcept}
                        placeholder={item.concept}
                        disabled={isDisabled}
                        onChange={(e) => handleChange(e)}
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
