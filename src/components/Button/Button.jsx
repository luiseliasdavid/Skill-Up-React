import React from "react";
import PropTypes from "prop-types";
export const Button = ({ variant = "primary", action, text = "Sin texto" }) => {
    return (
        <button onClick={action} className={`btn-${variant}`}>
            {text}
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.string,
    text: PropTypes.string.isRequired,
    action: PropTypes.func,
};

export default Button;
