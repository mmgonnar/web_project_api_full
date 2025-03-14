import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ loading, color = "#FFF", size = 50 }) => {
  return (
    <div
      className="loading-spinner"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ClipLoader color={color} loading={loading} size={size} />
    </div>
  );
};

export default LoadingSpinner;
