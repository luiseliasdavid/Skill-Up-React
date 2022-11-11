import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { useFormik } from "formik";
import * as Yup from "yup";
import './Register.css'

const Register = () => {

    const navigate = useNavigate()


    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    const walletApi = axios.create({
        baseURL: 'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com',
    })

    const onSubmit = () => {
        walletApi.post('/users', {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password,
        })
        .then((res) => res.data )
        .then((res) => {
            // Falta lógica para que se avise el status de la response. Si está duplicado se debe avisar también.
            console.log("Form OK");
            localStorage.setItem("userData", JSON.stringify(res))
            navigate('/', { replace: true })
        })
        .catch((error) => {
            console.log(error);
        })

    }

    const required = "* Campo obligatorio.";

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required(required),
        lastName: Yup.string().required(required),
        email: Yup.string()
            .email("Debe ser un email válido.")
            .required(required),
        password: Yup.string().required(required),
    });

    // useFormik espera los parámetros initialValues, validationSchema y onSubmit.
    const formik = useFormik({ initialValues, validationSchema, onSubmit });

    const { errors, touched, values, handleChange, handleBlur, handleSubmit } = formik;

    return <div className="container">
        {/* El que se encarga de hacer el submit es el handleSubmit */}
        <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
                <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">First Name</label>
                <div className="col-sm-10">
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
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputLastName" className="col-sm-2 col-form-label">Last Name</label>
                <div className="col-sm-10">
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
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
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
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
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
                </div>
            </div>
            <div className="col-sm-12">
                <button type="submit" className='btn btn-outline-primary'>Registrarse</button>
                <Link to="/"><button type="button" className='btn btn-outline-primary'>Iniciar Sesión</button></Link>
            </div>
            
        </form>
  </div>

};

export default Register;