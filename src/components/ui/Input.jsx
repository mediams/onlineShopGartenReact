import React from "react";

const Input = ({ value, onChange, placeholder, name, id, className }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      id={id}
      className={className}
    />
  );
};

export default Input;
