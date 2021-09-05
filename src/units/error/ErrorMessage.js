import React, { useContext } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import { theme } from "../../theme";
import { MdCancel } from "react-icons/md";

export default function ErrorMessage({ message }) {
  const { mode } = useContext(ThemeContext);
  return (
    <div
      className="mt-10  alert"
      style={{
        backgroundColor: theme[mode].inputBackground,
        color: theme[mode].color,
      }}
    >
      <div className="alert-item-1">
        <MdCancel size={20} className="error-title" />
      </div>
      <div className="alert-item-2 p-2">
        <p className="error-title">Error Message</p>
        <p>{message} </p>
      </div>
    </div>
  );
}
