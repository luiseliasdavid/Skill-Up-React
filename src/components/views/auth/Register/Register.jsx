import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { createUser } from "../../../../redux/actions/userActions";
import toast from "../../../../utils/toast";
import swal from "../../../../utils/swal";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    const required = "* Campo obligatorio.";

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required(required),
        lastName: Yup.string().required(required),
        email: Yup.string()
            .email("Debe ser un email válido.")
            .required(required),
        password: Yup.string().required(required),
    });

    const onSubmit = () => {
        const userData = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password,
            roleId: 1,
            points: 0,
        };

        dispatch(createUser(userData)).then((res) => {
            console.log(res);
            const { status, error } = res;
            if (!error) {
                toast(
                    `¡Te registraste correctamente ${res?.first_name}!`,
                    "success"
                );
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
        <div className="d-flex justify-content-center row">
            <form
                onSubmit={handleSubmit}
                className="col-10 d-flex flex-column align-items-center g-3"
            >
                <h1>Creá tu cuenta</h1>

                <label
                    htmlFor="inputFirstName"
                    className="col-6 d-flex flex-column mb-3"
                >
                    <span className="label-color form-label">Nombre</span>
                    <input
                        type="text"
                        name="firstName"
                        autoComplete="off"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.firstName && touched.firstName
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                    />
                    {errors.firstName && touched.firstName && (
                        <div
                            id="validationServerUsernameFeedback"
                            className="invalid-feedback"
                        >
                            {errors.firstName}
                        </div>
                    )}
                </label>

                <label
                    htmlFor="inputLastName"
                    className="col-6 d-flex flex-column mb-3"
                >
                    <span className="label-color form-label">Apellido</span>
                    <input
                        type="text"
                        name="lastName"
                        autoComplete="off"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.lastName && touched.lastName
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                    />
                    {errors.lastName && touched.lastName && (
                        <div
                            id="validationServerUsernameFeedback"
                            className="invalid-feedback"
                        >
                            {errors.lastName}
                        </div>
                    )}
                </label>

                <label
                    htmlFor="inputEmail"
                    className="col-6 d-flex flex-column mb-3"
                >
                    <span className="label-color form-label">Email</span>
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

                <label
                    htmlFor="inputPassword"
                    className="col-6 d-flex flex-column mb-3"
                >
                    <span className="label-color form-label">Contraseña</span>
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

                <div className="col-sm-12">
                    <button type="submit" className="btn btn-outline-primary">
                        Registrarse
                    </button>
                </div>

                <div className="mt-3">
                    <Link to="/">Iniciar Sesión</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
