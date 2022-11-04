import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "../../../../utils/swal";
import toast from "../../../../utils/toast";

const Login = () => {
    const API_ENDPOINT =
        "http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/";
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    
    useEffect(() => {
        // Esto es para que si el usuario se redirige al login (cambiando la ruta), lo desloguee
        localStorage.getItem("token") && localStorage.removeItem("token");

        if (!token) return;

        localStorage.setItem("token", token);

        fetch(`${API_ENDPOINT}auth/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem('userData', JSON.stringify(data));
                navigate('/home', { redirect: true });
            })
            .catch((err) => console.log(err));
    }, [token,navigate]);

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

    const onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = values;

        fetch(`${API_ENDPOINT}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.accessToken) {
                    setToken(data.accessToken);
                    toast("Todo bien", "success");
                } else {
                    swal("Usuario o contraseña incorrecta.");
                }
            })
            .catch((err) => console.log(err));
    };

    const formik = useFormik({ initialValues, validationSchema, onSubmit });

    const { errors, touched, values, handleChange, handleBlur } = formik;

    return (
        <div className="d-flex justify-content-center row">
            <form
                onSubmit={onSubmit}
                className="col-6 d-flex flex-column align-items-center g-3"
            >
                <h1>Iniciar sesión</h1>

                <label className="col-6 d-flex flex-column mb-3">
                    <span className="form-label">Email</span>
                    <input
                        type="text"
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
                    <span className="form-label">Contraseña </span>
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
