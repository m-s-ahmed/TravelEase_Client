import React from "react";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <span className="loading loading-spinner loading-lg"></span>
      <p className="mt-4 opacity-70">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
