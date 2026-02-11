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

const SectionInfo = () => {
  const infoData = [
    {
      id: 1,
      value: 47,
      label: "Total Prefectures",
      icon: "🗾",
    },
    {
      id: 2,
      value: 125800000,
      label: "Total Population",
      icon: "👥",
    },
    {
      id: 3,
      value: 377975,
      label: "Total Area (km²)",
      icon: "🗺️",
    },
    {
      id: 4,
      value: 1718,
      label: "Municipalities",
      icon: "🏛️",
    },
  ];

  return (
    <div id="stats-section" className="bg-gradient-to-b from-neutral-900 via-amber-950/40 to-neutral-900 py-12 sm:py-16 md:py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-10 md:mb-12"
      >
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-amber-50 mb-2 sm:mb-3">
          Japan by the Numbers
        </h2>
        <p className="text-amber-100 text-xs sm:text-sm md:text-base">
          Discover the rich diversity across the nation
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center max-w-6xl mx-auto">
        {infoData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 }
            }}
            className="group relative bg-neutral-800/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 sm:p-5 md:p-6 w-full sm:w-[calc(50%-0.75rem)] md:w-72 border border-amber-900/50 hover:border-amber-800/70 transition-all overflow-hidden"
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex gap-3 sm:gap-4 items-center">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl"
              >
                {item.icon}
              </motion.div>
              <div className="text-left">
                <h1 className="font-bold text-2xl sm:text-3xl text-amber-50">
                  <CountUpAnimation end={item.value} />
                </h1>
                <p className="text-amber-200 text-xs sm:text-sm mt-1">{item.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionInfo;
