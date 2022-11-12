import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { balance, userData } from "../../../redux/actions";

import swal from "../../../utils/swal";

const Spents = () => {
  const data = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    dispatch(userData());
    dispatch(balance());
  }, [dispatch]);

  //crear funcion que envie un ok o un error para facilitar la funcion de redux
  const EditConcept = () => {
    setIsDisabled(!isDisabled);

    dispatch()
      .then((res) => {
        const { status } = res;

        if (status.status !== 200) {
          swal(
            "Hubo un error.",
            `Detalle del error: ${status.message}`,
            "error"
          );
        } else {
          //setIsDisabled(isDisabled);
        }
      })
      .catch((err) => {
        swal(
          "Hubo un error inesperado. Recarga la página e intenta nuevamente.",
          "",
          "error"
        );
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
          <button onClick={() => EditConcept()} className="btn btn-info">
            Editar Concepto
          </button>
          <div className="d-flex flex-wrap align-items-center m-4">
            {data.transactions.payments?.map((item) => (
              <table className="table table-sm" key={item.id}>
                <thead>
                  <tr>
                    <th scope="col">Concepto</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="text" placeholder={item.concept} disabled={isDisabled} />
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
