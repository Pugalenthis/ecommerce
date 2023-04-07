import React from "react";
import SpinnerImage from "./spinner.gif";

const Spinner = () => {
  return (
    <img className="relative inset-x-1/2 inset-y-1/2" src={SpinnerImage} />
  );
};

export default Spinner;
