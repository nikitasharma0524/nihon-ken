import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PrefectureModal = ({ isOpen, onClose, prefecture }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!prefecture?.name) return;
    import(`./images/prefectures/${prefecture.name}.jpg`)
      .then((img) => setImage(img.default))
      .catch(() =>
        import(`./images/prefectures/Niigata.jpg`).then((img) =>
          setImage(img.default),
        ),
      );
  }, [prefecture]);

  if (!isOpen || !prefecture) return null;

  const mapSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    prefecture.name + " Japan",
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 flex justify-center items-center z-50 p-4 overflow-y-auto"
          style={{
            backgroundColor: "rgba(28,25,23,0.6)",
            backdropFilter: "blur(6px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative max-w-2xl w-full my-8 overflow-hidden"
            style={{ backgroundColor: "#FDF8F3", border: "1px solid #E5D5C8" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <motion.button
              whileHover={{ color: "#9B2335" }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-lg transition-colors"
              style={{ color: "#6B5C52" }}
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </motion.button>

            {/* Image */}
            {image && (
              <div className="relative overflow-hidden">
                <div
                  className="absolute inset-0 z-[1]"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 60%, #FDF8F3)",
                  }}
                />
                <img
                  src={image}
                  alt={prefecture.name}
                  className="w-full h-48 sm:h-60 md:h-72 object-cover"
                />
              </div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="p-6 sm:p-8"
            >
              {/* Title */}
              <div className="">
                <p
                  className="text-[10px] tracking-[0.2em] uppercase mb-2"
                  style={{ color: "#9B9080" }}
                >
                  {prefecture.region}
                </p>
                <h2
                  className="font-serif text-3xl sm:text-4xl mb-1"
                  style={{ color: "#1C1917" }}
                >
                  {prefecture.name}
                </h2>
                <p className="text-sm" style={{ color: "#A89080" }}>
                  Capital: {prefecture.capital}
                </p>
                <div
                  className="h-px mt-4"
                  style={{ backgroundColor: "#E5D5C8" }}
                />
              </div>

              {/* Description */}
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "#4A3D36" }}
              >
                {prefecture.description}
              </p>

              {/* Detail rows */}
              <div className="space-y-0 mb-6">
                <div
                  className="flex gap-4 py-3"
                  style={{ borderTop: "1px solid #E5D5C8" }}
                >
                  <span
                    className="text-[11px] tracking-widest uppercase w-28 flex-shrink-0 pt-0.5"
                    style={{ color: "#9B9080" }}
                  >
                    Famous Food
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#4A3D36" }}
                  >
                    {prefecture.food || "—"}
                  </p>
                </div>
                <div
                  className="flex gap-4 py-3"
                  style={{ borderTop: "1px solid #E5D5C8" }}
                >
                  <span
                    className="text-[11px] tracking-widest uppercase w-28 flex-shrink-0 pt-0.5"
                    style={{ color: "#9B9080" }}
                  >
                    Notable Fact
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#4A3D36" }}
                  >
                    {prefecture.interestingFact}
                  </p>
                </div>
              </div>

              {/* Maps link */}
              <motion.a
                whileHover={{ color: "#9B2335" }}
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-wide uppercase underline underline-offset-4 transition-colors"
                style={{ color: "#6B5C52" }}
              >
                View on Google Maps →
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrefectureModal;
