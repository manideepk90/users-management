import React from "react";

function Button({
  children = "save",
  onClick = () => {},
  padding = "8px 24px",
  backgroundColor = "#2C60AC",
  color = "white",
  ...rest
}) {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    button: {
      padding,
      backgroundColor,
      border: "none",
      borderRadius: 3,
      color,
      "&:hover": {
        backgroundColor: "blue",
      },
    },
  };
  return (
    <div style={styles.container}>
      <button {...rest} onClick={onClick} style={styles.button}>
        {children}
      </button>
    </div>
  );
}

export default Button;
