import React, { useId } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: 5,
    padding: 10,
  },
  label: {
    userSelect: "none",
  },
  input: {
    padding: 5,
  },
};

function InputField({
  label = "",
  placeholder = `Enter ${label}`,
  handleOnChange,
  value,
  inputProps = {},
}) {
  const id = useId();
  return (
    <div style={styles.container}>
      <label htmlFor={id} style={styles.label}>
        {label}
      </label>
      <input
        {...inputProps}
        style={styles?.input}
        id={id}
        placeholder={placeholder}
        onChange={(e) => {
          handleOnChange && handleOnChange(e.target.value);
        }}
        value={value}
      />
    </div>
  );
}

export default InputField;
