import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { balance, userData } from "../../../redux/actions";

const Spents = () => {
  const data = useSelector((state) => state.userData);


  if (data.transactions) console.log(data.transactions.payments);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(userData());
    dispatch(balance());
  }, [dispatch]);

  const EditConcept = (id) => {
    console.log(id);
  }
  

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
            {
                data.transactions.payments?.map((item) => (
                <div
                  className="card text-bg-primary m-3"
                  style={{ maxWidth: '15rem' }}
                  key={item.id}
                >
                  <div className="card-body">
                    <div className="card-header">
                      <h5 className="card-title">{item.concept} <button onClick={(id) => EditConcept(item.id)} className="btn btn-light">Editar</button> </h5>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Monto: {item.amount}</li>
                      <li className="list-group-item">Fecha: {new Date(item.createdAt).toLocaleDateString('es-ES') }</li>
                    </ul>
                  </div>
                </div>
                ))
            }
          </div>
        </>
      )}
    </>
  );
};

export default Spents;
