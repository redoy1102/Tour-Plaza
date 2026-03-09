import React from "react";

const Spinner: React.FC = () => {
  console.log("Spinner component rendered");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        <h1 className="mt-2 text-gray-900">Loading...</h1>
      </div>
    </div>
  );
};

export default Spinner;
