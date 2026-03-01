import React from "react";
import { motion } from "framer-motion";

const Nav = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToPrefectures = () =>
    document
      .getElementById("prefectures-section")
      ?.scrollIntoView({ behavior: "smooth" });
  const scrollToStats = () =>
    document
      .getElementById("stats-section")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex z-50 justify-between sticky top-0 left-0 w-full items-center h-14 sm:h-16 px-6 sm:px-10 bg-[#F5EFE6]/95 backdrop-blur-sm border-b border-[#E5D5C8]"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={scrollToTop}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="w-7 h-7 bg-[#1C1917] flex items-center justify-center">
          <span className="text-[#F5EFE6] text-xs font-bold tracking-tight">
            N
          </span>
        </div>
        <span className="text-sm font-medium text-[#1C1917] tracking-widest uppercase">
          NihonKen
        </span>
        <span className="text-[#C4A89A] text-sm hidden sm:inline">｜</span>
        <span
          className="text-[#A89080] text-sm hidden sm:inline"
          style={{ fontWeight: 300 }}
        >
          ニホンケン
        </span>
      </motion.div>

      {/* Links */}
      <div className="flex items-center gap-6 sm:gap-8">
        <motion.button
          whileHover={{ color: "#9B2335" }}
          onClick={scrollToTop}
          className="text-[11px] tracking-widest uppercase text-[#6B5C52] hidden sm:block transition-colors"
        >
          Home
        </motion.button>
        <motion.button
          whileHover={{ color: "#9B2335" }}
          onClick={scrollToStats}
          className="text-[11px] tracking-widest uppercase text-[#6B5C52] hidden sm:block transition-colors"
        >
          Stats
        </motion.button>
        <motion.button
          whileHover={{ color: "#9B2335" }}
          onClick={scrollToPrefectures}
          className="text-[11px] tracking-widest uppercase text-[#6B5C52] transition-colors"
        >
          Explore
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Nav;
