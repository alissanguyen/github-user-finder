import * as React from "react";
import "./FloatingDeleteButton.css";

export const FloatingDeleteButton = (props) => {
  return (
    <button
      className="floating-delete-button"
      aria-label={`Delete user ${props.userId}`}
      onClick={() => props.onClick(props.userId)}
    ></button>
  );
};
