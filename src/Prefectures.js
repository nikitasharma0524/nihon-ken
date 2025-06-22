import React, { useState } from "react";
import Prefecture from "./Prefecture";
import Footer from "./Footer";
import PrefectureModal from "./PrefectureModal";

const Prefectures = ({ prefectures }) => {
  console.log("Prefectures received:", prefectures);

  const [selectedPref, setSelectedPref] = useState(null);
  const openModal = (pref) => setSelectedPref(pref);
  const closeModal = () => setSelectedPref(null);

  if (!Array.isArray(prefectures)) {
    return <div className="text-red-600 text-center">Invalid data format</div>;
  }

  if (prefectures.length === 0) {
    return (
      <div className="text-gray-500 text-center">No prefectures found.</div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-8 m-8 justify-center">
        {prefectures.map((pref) => (
          <Prefecture
            key={pref.id}
            name={pref.name}
            capital={pref.capital}
            description={pref.interestingFact}
            region={pref.region}
            onViewDetails={() => openModal(pref)}
          />
        ))}
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
