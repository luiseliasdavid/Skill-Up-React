import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { sendMoneyToUser } from "../../../redux/actions/accountActions";
import { getUserFromAccount } from "../../../redux/actions/userActions";

import { currencyFormatter } from "../../../utils/formatters";
import toast from "../../../utils/toast";
import swal from "../../../utils/swal";
import { useEffect, useState } from "react";

const Transfers = () => {
    const dispatch = useDispatch();
    const { loading, accountData } = useSelector(
        (state) => state.accountReducer
    );

    const initialValues = {
        toAccountId: "",
        amount: "",
        concept: "",
    };

    const validationSchema = Yup.object().shape({
        toAccountId: Yup.number("Debe ser un número")
            .positive("Debe ingresar un número positivo.")
            .required(
                "Debe ingresar el ID de la cuenta hacia la que quiere enviar dinero."
            ),
        amount: Yup.number("Debe ser un número")
            .positive("Debe ingresar un número positivo.")
            .required("Debe ingresar el monto que desea transferir."),
        concept: Yup.string().required(
            "Debe ingresar un concepto de la transferencia."
        ),
    });

    const onSubmit = () => {
        resetForm();
        const { toAccountId, amount, concept } = values;

        dispatch(sendMoneyToUser({ toAccountId, amount, concept })).then(
            (res) => {
                const { status, error } = res;
                if (!error) {
                    toast(`Envío realizado correctamente`, "success");
                } else {
                    swal(
                        "Hubo un error.",
                        `Error ${status}: ${error}`,
                        "error"
                    );
                }
            }
        );
    };

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const {
        errors,
        touched,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
    } = formik;

    const [destinataryName, setDestinataryName] = useState("");

    const handleSearch = (e) => {
        handleBlur(e);
        dispatch(getUserFromAccount(values.toAccountId)).then((res) => {
            const { first_name, last_name } = res;
            setDestinataryName(
                first_name && last_name
                    ? `${first_name} ${last_name}`
                    : "Usuario no encontrado"
            );
        });
    };

    return (
        <div>
            <div className="container">
                <div className="row justify-content-md-center">
                    <form onSubmit={handleSubmit} className="col-3">
                        <div className="mb-3">
                            <label className="form-label">
                                Saldo Disponible
                            </label>
                            <div className="input-group mb-3">
                                <span className="form-control bg-light">
                                    {!loading
                                        ? currencyFormatter(accountData.money)
                                        : "..."}
                                </span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Id de la cuenta
                            </label>
                            <input
                                type="number"
                                name="toAccountId"
                                value={values.toAccountId}
                                onChange={handleChange}
                                onBlur={handleSearch}
                                className={
                                    errors.toAccountId && touched.toAccountId
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                            />
                            {errors.toAccountId && touched.toAccountId && (
                                <div
                                    id="validationServerUsernameFeedback"
                                    className="invalid-feedback"
                                >
                                    {errors.toAccountId}
                                </div>
                            )}
                            <div
                                className={
                                    destinataryName === "Usuario no encontrado"
                                        ? "fw-bold text-danger"
                                        : "fw-bold"
                                }
                            >
                                {destinataryName}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Monto a enviar</label>
                            <input
                                type="number"
                                name="amount"
                                value={values.amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.amount && touched.amount
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                            />
                            {errors.amount && touched.amount && (
                                <div
                                    id="validationServerUsernameFeedback"
                                    className="invalid-feedback"
                                >
                                    {errors.amount}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Concepto</label>
                            <input
                                type="text"
                                name="concept"
                                value={values.concept}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.concept && touched.concept
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                            />

                            {errors.concept && touched.concept && (
                                <div
                                    id="validationServerUsernameFeedback"
                                    className="invalid-feedback"
                                >
                                    {errors.concept}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={
                                destinataryName === "Usuario no encontrado"
                            }
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Transfers;
