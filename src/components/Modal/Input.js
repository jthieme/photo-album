import React from "react";

const Input = ({ label, eventFunction }) => {
  return (
    <div
      className="tile tile--center py-1 px-2 my-1"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.06) 0px 3px 6px, rgba(0, 0, 0, 0.03) 0px 3px 6px",
      }}
    >
      <div className="tile__container">
        <label>{label}</label>
        <div className="input-control">
          {label === "Favorite" ? (
            <input type="checkbox" onClick={eventFunction} />
          ) : (
            <input onChange={eventFunction} className="input--xs" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
