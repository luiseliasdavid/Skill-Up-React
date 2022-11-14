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
import Button from "../../Button/Button";
import Title from "../../Title/Title.jsx";

const Charge = () => {
  const dispatch = useDispatch();

  const { loading, accountData } = useSelector((store) => store.accountReducer);

  const [amount, setAmount] = useState(0);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (amount < 0) {
      toast("El monto debe ser mayor a $0", "error");
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
          <Title type="h1" text="¡Depositá en tu cuenta!" />

          <span>
            Saldo en cuenta:{" "}
            {!loading ? currencyFormatter(accountData?.money) : "..."}
          </span>

          <form className="mt-3" onSubmit={onSubmit}>
            <labe className="me-3">AR $</labe>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={handleChange}
              placeholder="Ingresa un monto..."
              className="me-3 ps-2"
            />

            {/* Inhabilitar el botton de CARGAR si amount es '' */}
            <Button
              className="me-3"
              variant={"success"}
              text={"Cargar saldo"}
              type={"submit"}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Charge;
