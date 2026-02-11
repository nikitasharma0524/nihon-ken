import React, { useState } from "react";
import { motion } from "framer-motion";
import Prefecture from "./Prefecture";
import Footer from "./Footer";
import PrefectureModal from "./PrefectureModal";

const Prefectures = ({ prefectures }) => {
  const [selectedPref, setSelectedPref] = useState(null);
  const [query, setQuery] = useState("");

  const openModal = (pref) => setSelectedPref(pref);
  const closeModal = () => setSelectedPref(null);

  if (!Array.isArray(prefectures)) {
    return <div className="text-red-600 text-center">Invalid data format</div>;
  }

  const filtered = prefectures.filter((pref) => {
    const q = query.toLowerCase();
    return (
      pref.name.toLowerCase().includes(q) ||
      pref.capital.toLowerCase().includes(q) ||
      pref.region.toLowerCase().includes(q) ||
      (pref.food && pref.food.toLowerCase().includes(q))
    );
  });

  return (
    <div id="prefectures-section" className="bg-gradient-to-b from-neutral-900 via-amber-950/30 to-neutral-900 py-12 sm:py-16 md:py-20 px-4 pb-0">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-10 md:mb-12"
      >
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-amber-50 mb-2 sm:mb-3">
          Explore All Prefectures
        </h2>
        <p className="text-amber-100 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
          Discover the unique charm of each region
        </p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, capital, food, or region..."
              className="w-full bg-neutral-800/80 backdrop-blur-sm border-2 border-amber-900/50 rounded-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base text-amber-50 placeholder-amber-200/50 shadow-lg focus:outline-none focus:border-amber-800 transition-all"
            />
            <div className="absolute right-4 sm:right-5 top-1/2 transform -translate-y-1/2 text-amber-200/70 text-base sm:text-lg">
              🔍
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Prefectures Grid */}
      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center max-w-7xl mx-auto mb-12 sm:mb-16 md:mb-20">
        {filtered.length > 0 ? (
          filtered.map((pref, index) => (
            <Prefecture
              key={pref.id}
              name={pref.name}
              capital={pref.capital}
              description={pref.interestingFact}
              region={pref.region}
              index={index}
              onViewDetails={() => openModal(pref)}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-amber-200/70 text-base sm:text-lg mt-12 sm:mt-16 text-center"
          >
            <div className="text-5xl sm:text-6xl mb-4">🔍</div>
            <p>No results found.</p>
            <p className="text-xs sm:text-sm text-amber-200/50 mt-2">Try a different search term</p>
          </motion.div>
        )}
      </div>

      <PrefectureModal
        isOpen={!!selectedPref}
        onClose={closeModal}
        prefecture={selectedPref}
      />

      <Footer />
    </div>
  );
};

export default Prefectures;
