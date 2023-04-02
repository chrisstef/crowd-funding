import React from "react";

import { metamask } from "../assets";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img
        src={metamask}
        alt="metamask loader"
        className="w-[200px] h-[200px] object-contain"
      />
      <p className="mt-[5px] font-epilogue font-bold text-[20px] text-white text-center">
        Transaction is in progress <br /> Please wait...
      </p>
    </div>
  );
};

export default Loader;
