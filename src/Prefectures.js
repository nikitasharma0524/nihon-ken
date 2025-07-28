import React, { useState } from "react";
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
    <div>
      <div className="max-w-3xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Name, Capital, Food, or Region..."
          className="w-full bg-white border border-gray-300 rounded-full px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div className="flex flex-wrap gap-6 mt-10 justify-center max-w-7xl mx-auto">
        {filtered.length > 0 ? (
          filtered.map((pref) => (
            <Prefecture
              key={pref.id}
              name={pref.name}
              capital={pref.capital}
              description={pref.interestingFact}
              region={pref.region}
              onViewDetails={() => openModal(pref)}
            />
          ))
        ) : (
          <div className="text-gray-500 text-lg mt-16">No results found.</div>
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
