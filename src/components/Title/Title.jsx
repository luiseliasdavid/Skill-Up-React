import React from "react";

export const Title = ({ type = "h1", text = "Probando" }) => {
  const title = `<${type}>${text}</${type}>`;

  return <div dangerouslySetInnerHTML={{ __html: title }}></div>;
};

export default Title;
