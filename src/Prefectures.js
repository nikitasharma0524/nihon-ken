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
    return <div className="text-center py-20" style={{ color: "#9B2335" }}>Invalid data format</div>;
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
    <div
      id="prefectures-section"
      className="py-16 sm:py-20 md:py-24 px-6 sm:px-10 pb-0 border-t border-[#E5D5C8]"
      style={{ backgroundColor: "#F5EFE6" }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-10 sm:mb-12 text-center"
      >
        <p className="text-[11px] tracking-[0.25em] uppercase mb-3" style={{ color: "#9B9080" }}>
          都道府県
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-8" style={{ color: "#1C1917" }}>
          All Prefectures
        </h2>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-lg relative mx-auto"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, capital, food, or region…"
            className="w-full px-5 py-3 text-sm transition-all focus:outline-none"
            style={{
              border: "1.5px solid #C4A89A",
              backgroundColor: "#FDF8F3",
              color: "#1C1917",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#9B2335")}
            onBlur={(e) => (e.target.style.borderColor = "#C4A89A")}
          />
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm select-none"
            style={{ color: "#A89080" }}
          >
            検索
          </span>
        </motion.div>
      </motion.div>

      {/* Grid */}
      <div className="flex flex-wrap gap-4 sm:gap-5 justify-center max-w-7xl mx-auto mb-16 sm:mb-20 md:mb-24">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center w-full"
          >
            <p className="font-serif text-2xl mb-2" style={{ color: "#1C1917" }}>見つかりません</p>
            <p className="text-sm" style={{ color: "#A89080" }}>No results found — try a different term.</p>
          </motion.div>
        )}
      </div>

      <PrefectureModal isOpen={!!selectedPref} onClose={closeModal} prefecture={selectedPref} />
      <Footer />
    </div>
  );
};

export default Prefectures;
