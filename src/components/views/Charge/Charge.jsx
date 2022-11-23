import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { accountDeposit } from "../../../redux/actions/accountActions";
import { currencyFormatter } from "../../../utils/formatters";
import toast from "../../../utils/toast";
import swal from "../../../utils/swal";
import Loader from "../../Loader/Loader";
import Button from "../../Button/Button";
import Title from "../../Title/Title.jsx";

const Charge = () => {
    const dispatch = useDispatch();

    const { loading, accountData } = useSelector(
        (store) => store.accountReducer
    );

    const [amount, setAmount] = useState("");

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (amount < 0) {
            toast("El monto debe ser mayor a $0", "error");
            setAmount("");
            return;
        }

        dispatch(accountDeposit(amount, accountData.id)).then((res) => {
            const { status, error } = res;
            if (!error) {
                toast(`Tu dinero se depositó correctamente.`, "success");
                setAmount("");
            } else {
                swal("Hubo un error.", `Error ${status}: ${error}`, "error");
            }
        });
    };

    return (
        <div>
            <Title type="h1" text="¡Depositá en tu cuenta!" />

            {loading ? (
                <Loader />
            ) : (
                <div>
                    <span>
                        Saldo en cuenta:{" "}
                        {!loading
                            ? currencyFormatter(accountData?.money)
                            : "..."}
                    </span>

                    <form onSubmit={onSubmit} className="mt-3">
                        <label className="me-3">AR $</label>
                        <input
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={handleChange}
                            placeholder="Ingresa un monto..."
                            className="p-1 me-2"
                        />

                        <Button
                            className="mx-3"
                            variant={"success"}
                            text={"Cargar saldo"}
                            type={"submit"}
                            disabled={amount === "" || Number(amount) <= 0}
                        />
                    </form>
                </div>
            )}
        </div>
    );
};

export default Charge;
