import { useFormik } from "formik";

const MovementsFilters = ({ transactions, setFilteredTransactions }) => {
    const initialValues = {
        type: "",
        concept: ""
    };

    const onSubmit = () => {
        let filtered = transactions;
        for (const filter in values) {
            if (values[filter] !== "") {
                filtered = filtered.filter((transaction) =>
                    transaction[filter]
                        .toLowerCase()
                        .includes(values[filter].toLowerCase())
                );
            }
        }

        setFilteredTransactions(filtered);
    };

    const formik = useFormik({ initialValues, onSubmit });

    const { values, handleSubmit, handleChange, resetForm } = formik;

    const handleReset = () => {
        resetForm();
        setFilteredTransactions(transactions);
    };

    return (
        <form onSubmit={handleSubmit} className='d-flex flex-column p-3'>
            <ul className="movements-filters">
                <li className="movements-filter">
                    <select
                        className="form-select"
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                    >
                        <option value="">Tipo de transacción</option>
                        <option value="payment">Egreso</option>
                        <option value="topup">Ingreso</option>
                    </select>
                </li>

                <li className="movements-filter">
                    <input
                        type="concept"
                        name="concept"
                        placeholder="Filtrar por concepto"
                        className="form-control"
                        onChange={handleChange}
                        value={values.concept}
                    />
                </li>
            </ul>

            <button type="submit" className="btn btn-primary mt-3">
                Aplicar los filtros
            </button>

            <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleReset}
            >
                Limpiar los filtros
            </button>
        </form>
    );
};

export default MovementsFilters;
