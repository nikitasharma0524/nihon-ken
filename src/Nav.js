import React from "react";
import { motion } from "framer-motion";

const Nav = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex z-50 justify-between fixed top-0 left-0 w-full items-center text-center text-white h-12 p-4 mt-6 ml-2"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl font-bold cursor-pointer drop-shadow-lg">
          NihonKen
        </span>
      </motion.div>
      <div className="flex gap-4">
        {/* <span className="cursor-pointer">Home</span>
        <span className="cursor-pointer">Regions</span> */}
      </div>
    </motion.div>
  );
};

export default Nav;
