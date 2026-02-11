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
          setImage(img.default)
        )
      );
  }, [prefecture]);

  if (!isOpen || !prefecture) return null;

  const mapSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    prefecture.name + " Japan"
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-2 sm:p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-neutral-800 to-neutral-900 backdrop-blur-md p-0 rounded-3xl max-w-2xl w-full shadow-2xl relative border border-amber-900/50 my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-neutral-900/80 hover:bg-amber-900/60 text-amber-100 text-xl sm:text-2xl font-bold transition-colors border border-amber-900/50 shadow-lg"
              onClick={onClose}
            >
              ✕
            </motion.button>

            {/* Image */}
            {image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900 z-[1]" />
                <img
                  src={image}
                  alt={prefecture.name}
                  className="w-full h-48 sm:h-60 md:h-72 object-cover"
                />
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="p-4 sm:p-6 md:p-8"
            >
              {/* Title Section */}
              <div className="mb-4 sm:mb-5">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-amber-50 font-serif">
                  {prefecture.name}
                </h2>

                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-amber-900/30">
                  <span className="text-amber-200/70 text-base">🏛️</span>
                  <p className="text-amber-100 text-sm sm:text-base">
                    <span className="text-amber-200/70">Capital:</span>{" "}
                    <span className="font-semibold">{prefecture.capital}</span>
                  </p>
                </div>

                <p className="text-amber-100/80 text-sm sm:text-base leading-relaxed">
                  {prefecture.description}
                </p>
              </div>

              {/* Google Maps Button */}
              <motion.a
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-900/60 to-amber-800/50 hover:from-amber-800/70 hover:to-amber-700/60 text-amber-50 rounded-full text-sm font-medium mb-4 transition-all border border-amber-900/50 shadow-lg"
              >
                <span>📍</span>
                <span>View on Google Maps</span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>

              {/* Details Grid */}
              <div className="space-y-2 sm:space-y-2.5">
                <div className="bg-gradient-to-br from-neutral-900/70 to-neutral-900/50 p-3 sm:p-3.5 rounded-2xl border border-amber-900/30 backdrop-blur-sm">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="text-lg sm:text-xl flex-shrink-0">🥘</span>
                    <div>
                      <strong className="text-amber-200 text-sm block mb-0.5 flex">
                        Famous Food
                      </strong>
                      <p className="text-amber-100/80 text-sm leading-relaxed">
                        {prefecture.food || "Wanko Soba, Morioka Reimen"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-neutral-900/70 to-neutral-900/50 p-3 sm:p-3.5 rounded-2xl border border-amber-900/30 backdrop-blur-sm">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="text-lg sm:text-xl flex-shrink-0">🧭</span>
                    <div>
                      <strong className="text-amber-200 text-sm block mb-0.5 flex">
                        Interesting Fact
                      </strong>
                      <p className="text-amber-100/80 text-sm leading-relaxed">
                        {prefecture.interestingFact}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-neutral-900/70 to-neutral-900/50 p-3 sm:p-3.5 rounded-2xl border border-amber-900/30 backdrop-blur-sm">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="text-lg sm:text-xl flex-shrink-0">🗺️</span>
                    <div>
                      <strong className="text-amber-200 text-sm block mb-0.5 flex">
                        Region
                      </strong>
                      <p className="text-amber-100/80 text-sm">
                        {prefecture.region}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrefectureModal;
