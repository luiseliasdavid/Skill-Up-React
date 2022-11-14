export const Button = ({ variant = "primary", action, text = "", disabled }) => {
    return (
        <button onClick={action} className={`btn btn-${variant}`} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
