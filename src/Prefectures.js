import React, { useState } from "react";
import Prefecture from "./Prefecture";
import Footer from "./Footer";
import PrefectureModal from "./PrefectureModal";

const Prefectures = ({ prefectures }) => {
  const [selectedPref, setSelectedPref] = useState(null);
  const [query, setQuery] = useState("");

  const [aiPrompt, setAiPrompt] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

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

  const handleAskAI = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiAnswer("");

    try {
      const res = await fetch("http://localhost:5001/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      const data = await res.json();
      setAiAnswer(data.answer || "No response.");
    } catch (err) {
      setAiAnswer("Error contacting AI server.");
    }

    setAiLoading(false);
  };
  return (
    <div className="px-4 sm:px-12 py-6">
      <div className="max-w-3xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Name, Capital, Food, or Region..."
          className="w-full bg-white border border-gray-300 rounded-full px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* 🌟 AI Travel Guide */}
      <div className="max-w-3xl mx-auto mt-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder='Ask the AI, e.g. "Tell me about food in Kyoto"'
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleAskAI}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
          >
            Ask
          </button>
        </div>

        {aiLoading && <p className="mt-3 text-sm text-gray-500">Thinking...</p>}
        {!aiLoading && aiAnswer && (
          <div className="mt-3 flex">
            <div className="inline-block bg-white/90 backdrop-blur-md text-gray-800 text-sm px-4 py-2 rounded-2xl shadow-lg max-w-[80%] whitespace-pre-line leading-relaxed">
              {aiAnswer}
            </div>
          </div>
        )}
      </div>

      {/* 📍 Prefecture Grid */}
      <div className="flex flex-wrap gap-8 mt-10 justify-center">
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
