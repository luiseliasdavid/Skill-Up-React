import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    accountDeposit,
    getUserAccount,
} from "../../../redux/actions/accountActions";
import { currencyFormatter } from "../../../utils/formatters";
import toast from "../../../utils/toast";
import swal from "../../../utils/swal";
import Loader from "../../Loader/Loader";

const Charge = () => {
    const dispatch = useDispatch();

    const { loading, accountData } = useSelector(
        (store) => store.accountReducer
    );

    const [amount, setAmount] = useState(0);
    
    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (amount < 0) {
            toast("El monto debe ser mayor a $0", 'error');
            setAmount(0);
            return;
        }

        dispatch(accountDeposit(amount, accountData.id)).then((res) => {
            const { status, error } = res;
            if (!error) {
                toast(`Tu dinero se depositó correctamente.`, "success");
                setAmount(0);
            } else {
                swal("Hubo un error.", `Error ${status}: ${error}`, "error");
            }
        });
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <h1>¡Depositá en tu cuenta!</h1>
                    <span>
                        Saldo en cuenta:{" "}
                        {!loading
                            ? currencyFormatter(accountData?.money)
                            : "..."}
                    </span>

                    <form onSubmit={onSubmit}>
                        <label>AR $</label>
                        <input
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={handleChange}
                            placeholder="Ingresa un monto..."
                        />

                        {/* Inhabilitar el botton de CARGAR si amount es '' */}
                        <button type={"submit"}>CARGAR SALDO</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Charge;
