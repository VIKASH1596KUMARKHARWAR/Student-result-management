// CustomInput.js
import React from "react";

const CustomInput = ({ type, label, id, name, onChng, onBlr, val }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChng}
        onBlur={onBlr}
        value={val}
        className="form-control"
      />
    </div>
  );
};

export default CustomInput;
