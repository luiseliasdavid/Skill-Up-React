import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getMovementDetail } from "../../../redux/actions/transactionActions";
import { currencyFormatter, dateFormatter } from "../../../utils/formatters";
import swal from "../../../utils/swal";
import Loader from "../../Loader/Loader"

const MovementDetail = () => {
    const { movementId } = useParams();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.transactionReducer);

    const [movementData, setMovementData] = useState({});

    useEffect(() => {
        dispatch(getMovementDetail(movementId)).then((res) => {
            const { status, error } = res;
            setMovementData(res);
            error &&
                swal("Hubo un error.", `Error ${status}: ${error}`, "error");
        });
    }, [dispatch, movementId]);

    return (
        <>
            {!loading ? (
                <div>
                    <h1>Detalle de la transacción con ID {movementData.id}</h1>
                    <div>
                        <p>Concepto: {movementData.concept}</p>
                        <div>
                            Monto: {currencyFormatter(movementData.amount)}
                        </div>
                        <div>
                            Fecha: {dateFormatter(movementData.createdAt)}
                        </div>
                        <div>
                            ID de Cuenta destino: {movementData.to_account_id}
                        </div>
                        <div>
                            Tipo de transacción: 
                            {movementData.type === "topup"
                                ? " Carga de saldo"
                                : " Pago"}
                        </div>
                    </div>
                    <Link to={'/movements'} className={'btn btn-primary mt-3'}>Regresar</Link>
                </div>
            ) : (
                <Loader />
            )}

        </>
    );
};

export default MovementDetail;
