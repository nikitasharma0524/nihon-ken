import React from "react";
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-8 sm:py-10 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-center gap-3"
    style={{ borderTop: "1px solid #E5D5C8", backgroundColor: "#F5EFE6" }}
  >
    <p className="text-xs tracking-widest" style={{ color: "#A89080" }}>
      © {new Date().getFullYear()} NihonKen ・ ニホンケン
    </p>
  </motion.footer>
);

export default Footer;
