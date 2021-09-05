import React from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import "./submitButton.css";

export default function SubmitButton({ triggerSearch, isLoading }) {
  return (
    <button
      className="h-40 w-50 rounded-border"
      data-testid="button-login"
      style={{ float: "right" }}
      onClick={() => triggerSearch()}
      disabled={isLoading}
    >
      {isLoading ? (
        <CgSpinnerTwoAlt size={30} fill={"white"} className="spinner" />
      ) : (
        <BiSearch size={30} fill={"white"} style={{ cursor: "pointer" }} />
      )}
    </button>
  );
}
