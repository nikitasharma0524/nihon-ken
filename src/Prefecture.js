import React from "react";
import { motion } from "framer-motion";

const Prefecture = ({ name, capital, description, region, index, onViewDetails }) => {
  const image = `/images/prefectures/${name}.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: (index % 12) * 0.04 }}
      whileHover={{ y: -4 }}
      className="group relative w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.875rem)] lg:w-[calc(25%-1rem)] flex flex-col overflow-hidden transition-shadow"
      style={{
        backgroundColor: "#FDF8F3",
        border: "1px solid #E5D5C8",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C4A89A")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5D5C8")}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <motion.img
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
          src={image}
          alt={name}
          loading="lazy"
        />
        {/* Region badge */}
        <span
          className="absolute top-2.5 right-2.5 text-[10px] tracking-wide px-2.5 py-1"
          style={{ backgroundColor: "#F5EFE6", color: "#6B5C52", border: "1px solid #E5D5C8" }}
        >
          {region}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-grow">
        <h3 className="font-serif text-lg sm:text-xl mb-1" style={{ color: "#1C1917" }}>
          {name}
        </h3>
        <p className="text-xs" style={{ color: "#A89080" }}>
          {capital}
        </p>
      </div>

      {/* View Details */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 mt-auto">
        <motion.button
          whileHover={{ color: "#9B2335" }}
          whileTap={{ scale: 0.97 }}
          onClick={onViewDetails}
          className="flex items-center gap-1.5 text-xs tracking-wide uppercase transition-colors"
          style={{ color: "#6B5C52" }}
        >
          View Details
          <span className="text-sm">→</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Prefecture;
