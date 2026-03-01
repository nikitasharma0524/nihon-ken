import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CountUpAnimation = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    let animationFrame;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
};

const infoData = [
  { id: 1, value: 47,        label: "Total Prefectures", kanji: "都道府県" },
  { id: 2, value: 125800000, label: "Total Population",  kanji: "人口"    },
  { id: 3, value: 377975,    label: "Area (km²)",        kanji: "面積"    },
  { id: 4, value: 1718,      label: "Municipalities",    kanji: "市町村"  },
];

const SectionInfo = () => (
  <div
    id="stats-section"
    className="py-16 sm:py-20 md:py-24 px-6 sm:px-10 border-t border-[#E5D5C8]"
    style={{ backgroundColor: "#F5EFE6" }}
  >
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mb-12 sm:mb-16"
    >
      <p className="text-[11px] tracking-[0.25em] uppercase mb-3" style={{ color: "#9B9080" }}>
        By the numbers
      </p>
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl" style={{ color: "#1C1917" }}>
        Japan at a Glance
      </h2>
    </motion.div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-[#E5D5C8]" style={{ backgroundColor: "#E5D5C8" }}>
      {infoData.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="relative p-8 sm:p-10 flex flex-col justify-between overflow-hidden"
          style={{ backgroundColor: "#F5EFE6" }}
        >
          {/* Kanji watermark */}
          <div
            className="absolute right-4 bottom-4 font-serif text-5xl sm:text-6xl select-none pointer-events-none"
            style={{ color: "#E5D5C8", opacity: 0.8 }}
            aria-hidden="true"
          >
            {item.kanji}
          </div>

          <div className="relative z-10">
            <p className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: "#A89080" }}>
              {item.label}
            </p>
            <h3
              className="font-serif text-4xl sm:text-5xl font-light"
              style={{ color: "#1C1917" }}
            >
              <CountUpAnimation end={item.value} />
            </h3>
          </div>

          {/* Accent line */}
          <div className="relative z-10 mt-6 h-px w-8" style={{ backgroundColor: "#9B2335" }} />
        </motion.div>
      ))}
    </div>
  </div>
);

export default SectionInfo;
