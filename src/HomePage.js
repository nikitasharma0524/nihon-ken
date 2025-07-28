import React, { useRef } from "react";
import Nav from "./Nav";
import SectionInfo from "./SectionInfo";
import Prefectures from "./Prefectures";
import ChatBotButton from "./ChatBot";

const HomePage = ({ prefectures }) => {
  const prefecturesRef = useRef(null);

  const handleExploreClick = () => {
    prefecturesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Nav />

      {/* Hero Section */}
      <div className="relative">
        <img
          className="h-screen object-cover w-full"
          src="/assets/pexels-liger-pham-232622-1108701.jpg"
          alt="Japan scenic background"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white bg-black/40">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Discover Japan’s 47 Prefectures.
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-6">
            Explore the unique culture, history, and beauty of each region.
          </h2>
          <button
            onClick={handleExploreClick}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-300 text-sm sm:text-base"
          >
            Explore
          </button>
        </div>
      </div>

      <ChatBotButton />
      <SectionInfo />

      <div ref={prefecturesRef}>
        <Prefectures prefectures={prefectures} />
      </div>
    </div>
  );
};

export default HomePage;
