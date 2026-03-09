import React from "react";
import ReactSwitch from "react-switch";

// Criamos o componente com letras maiúsculas para o React reconhecer
const CustomSwitch = ({ checked, onChange, label }) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
      {label && <span>{label}</span>}
      <ReactSwitch
        onChange={onChange}
        checked={checked}
        offColor="#cccccc"
        onColor="#4CAF50"
        uncheckedIcon={false}
        checkedIcon={false}
        height={20}
        width={40}
        handleDiameter={16}
      />
    </label>
  );
};

export default CustomSwitch;