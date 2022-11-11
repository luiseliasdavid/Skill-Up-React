import React from "react";
import PropTypes from "prop-types";

export const Title = ({ type = "h1", text, className }) => {
  const title = `<${type} className='${className}'>${text}</${type}>`;

  return <div dangerouslySetInnerHTML={{ __html: title }}></div>;
};

Title.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Title;
