import React from "react";

const Failed = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className=" space-y-3 text-center">
        <h4 className="text-2xl underline text-red-400 ">
          Transaction Failed, This may be Due to
        </h4>
        <p className="text-light">
          Wrong OTP was entered Incorrectly, including any special characters or
          spaces.
        </p>
        <p className="text-light">Slow Network in your Region</p>
        <p className="text-light">If this persist please contact support.</p>
      </div>
    </div>
  );
};

export default Failed;
