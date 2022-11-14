import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import "../auth.css";

import { login } from "../../../../redux/actions/authActions";
import swal from "../../../../utils/swal";
import toast from "../../../../utils/toast";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Debe ser un email válido.")
            .required("Debe ingresar un email."),
        password: Yup.string().required("Debe ingresar una contraseña"),
    });

    const onSubmit = () => {
        const { email, password } = values;

        dispatch(login({ email, password })).then((res) => {
            const { status, error } = res;
            if (!error) {
                toast(`¡Bienvenido ${res?.first_name}!`, "success");
                navigate("/home");
            } else {
                swal("Hubo un error.", `Error ${status}: ${error}`, "error");
            }
        });
    };

    const formik = useFormik({ initialValues, validationSchema, onSubmit });

    const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
        formik;

    return (
        <div className="d-flex justify-content-center">
            <form
                onSubmit={handleSubmit}
                className="col-6 d-flex flex-column align-items-center g-3"
            >
                <h1>Iniciar sesión</h1>

                <label className="col-6 d-flex flex-column mb-3">
                    <span className="form-label col-form-label">Email</span>
                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.email && touched.email
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                    />
                    {errors.email && touched.email && (
                        <div
                            id="validationServerUsernameFeedback"
                            className="invalid-feedback"
                        >
                            {errors.email}
                        </div>
                    )}
                </label>

                <label className="col-6 d-flex flex-column mb-3">
                    <span className="form-label  col-form-label">
                        Contraseña{" "}
                    </span>
                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.password && touched.password
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                    />
                    {errors.password && touched.password && (
                        <div
                            id="validationServerUsernameFeedback"
                            className="invalid-feedback"
                        >
                            {errors.password}
                        </div>
                    )}
                </label>

                <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                        Enviar
                    </button>
                </div>

                <div className="mt-3">
                    <Link to="/register">Registrarme</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
