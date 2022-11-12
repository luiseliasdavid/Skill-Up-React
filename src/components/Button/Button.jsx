export const Button = ({ variant = "primary", action, text = "" }) => {
    return (
        <button onClick={action} className={`btn btn-${variant}`}>
            {text}
        </button>
    );
};

export default Button;
