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
    <div className="bg-gradient-to-b from-neutral-900 via-amber-950/30 to-neutral-900 py-20 px-4 pb-0">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-3xl md:text-4xl text-amber-50 mb-3">
          Explore All Prefectures
        </h2>
        <p className="text-amber-100 text-sm md:text-base mb-8">
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
              className="w-full bg-neutral-800/80 backdrop-blur-sm border-2 border-amber-900/50 rounded-full px-6 py-4 text-base text-amber-50 placeholder-amber-200/50 shadow-lg focus:outline-none focus:border-amber-800 transition-all"
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-amber-200/70">
              🔍
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Prefectures Grid */}
      <div className="flex flex-wrap gap-6 justify-center max-w-7xl mx-auto mb-20">
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
            className="text-amber-200/70 text-lg mt-16 text-center"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p>No results found.</p>
            <p className="text-sm text-amber-200/50 mt-2">Try a different search term</p>
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
