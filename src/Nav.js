import React from "react";

const Nav = () => {
  return (
    <div className="flex z-10 justify-between fixed top-0 left-0 w-full items-center text-center bg-white h-12 p-4">
      <div>
        <span className="text-2xl font-bold cursor-pointer">NihonKen</span>
      </div>
      <div className="flex gap-4">
        {/* <span className="cursor-pointer">Home</span>
        <span className="cursor-pointer">Regions</span> */}
      </div>
    </div>
  );
};

export default Nav;
