import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Prefecture = ({ name, capital, description, region, index, onViewDetails }) => {
  const [image, setImage] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    import(`./images/prefectures/${name}.jpg`)
      .then((img) => setImage(img.default))
      .catch(() =>
        import(`./images/prefectures/Niigata.jpg`).then((img) =>
          setImage(img.default)
        )
      );
  }, [name]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: (index % 12) * 0.05 }}
      whileHover={{ y: -8 }}
      className="group relative bg-neutral-800/90 backdrop-blur-sm w-full sm:w-[47%] md:w-[30%] lg:w-[22%] rounded-2xl m-2 shadow-xl border border-amber-900/50 hover:border-amber-800/70 flex flex-col justify-between overflow-hidden transition-all"
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Image Section */}
      <div className="relative overflow-hidden">
        {image && (
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="aspect-[4/3] w-full object-cover rounded-t-2xl"
            src={image}
            alt={name}
            loading="lazy"
          />
        )}
        {/* Region Badge */}
        <span className="absolute top-3 right-3 bg-neutral-800/95 backdrop-blur-sm text-xs font-medium rounded-full px-3 py-1.5 shadow-lg border border-amber-900/50 text-amber-100">
          {region}
        </span>
      </div>

      {/* Content Section */}
      <div className="relative z-20 text-left p-5 flex-grow">
        <h3 className="font-bold text-xl text-amber-50 mb-1">{name}</h3>
        <div className="flex items-center gap-2 text-sm text-amber-200">
          <span className="text-xs">🏛️</span>
          <span>{capital}</span>
        </div>
      </div>

      {/* View Details Button */}
      <div className="relative z-20 mt-auto p-4 pt-0">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onViewDetails}
          className="w-full py-3 px-4 bg-amber-900/70 text-amber-50 text-sm font-medium rounded-full hover:bg-amber-800/80 transition-all duration-300 shadow-md flex items-center justify-center gap-2 group/btn border border-amber-900/50"
        >
          <span>View Details</span>
          <motion.span
            className="inline-block"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Prefecture;
