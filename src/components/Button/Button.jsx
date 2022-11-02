import React from "react";

export const Button = ({ variant = "correct", action, text }) => {
  return (
    <button onClick={action} className={`${variant}`}>
      {text}
    </button>
  );
};
export default Button;
