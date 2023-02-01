import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner
      animation="border"
      style={{
        marginLeft: "5px",
        display: "inline-block",
        height: "15px",
        width: "15px",
      }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader;
