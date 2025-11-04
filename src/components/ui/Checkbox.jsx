import React from "react";

const Checkbox = ({ checked, onChange, name, id, className }) => {
  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      className={className}
    />
  );
};

export default Checkbox;
