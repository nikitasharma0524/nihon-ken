import React from "react";
import { motion } from "framer-motion";

const Nav = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToPrefectures = () => {
    const element = document.getElementById("prefectures-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToStats = () => {
    const element = document.getElementById("stats-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex z-50 justify-between sticky top-0 left-0 w-full items-center text-white h-14 sm:h-16 px-4 sm:px-6 bg-black/30 backdrop-blur-md"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className="flex items-center gap-2"
      >
        <span className="text-2xl">🏯</span>
        <span className="text-xl sm:text-2xl font-bold cursor-pointer drop-shadow-lg">
          NihonKen
        </span>
      </motion.div>

      {/* Navigation Links */}
      <div className="flex items-center gap-3 sm:gap-6">
        <motion.button
          whileHover={{ scale: 1.1, color: "#fbbf24" }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="text-xs sm:text-sm font-medium cursor-pointer transition-colors hidden sm:block"
        >
          Home
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, color: "#fbbf24" }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToStats}
          className="text-xs sm:text-sm font-medium cursor-pointer transition-colors hidden sm:block"
        >
          Stats
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, color: "#fbbf24" }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToPrefectures}
          className="text-xs sm:text-sm font-medium cursor-pointer transition-colors"
        >
          Explore
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Nav;
