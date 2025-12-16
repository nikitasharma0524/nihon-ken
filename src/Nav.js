import React from "react";
import { motion } from "framer-motion";

const Nav = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex z-50 justify-between sticky top-0 left-0 w-full items-center text-white h-16 px-6 bg-black/30 backdrop-blur-md"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
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
