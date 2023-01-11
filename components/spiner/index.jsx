import React from "react";
import { HashLoader } from "react-spinners";

const Spiner = ({ loading }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 grid place-items-center z-50 opacity-50 bg-gray-500">
      <HashLoader color="#88888" loading={loading} />
    </div>
  );
};

export default Spiner;
