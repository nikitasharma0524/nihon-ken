import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-neutral-900 border-t border-amber-900/30 text-amber-100 text-xs sm:text-sm py-6 sm:py-8 text-center mt-0 px-4"
    >
      <p className="text-amber-200/70">
        © {new Date().getFullYear()} Nihonken ・ Learn about Japan, one fact at
        a time.
      </p>
    </motion.footer>
  );
};

export default Footer;
