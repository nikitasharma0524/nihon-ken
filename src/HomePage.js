import Nav from "./Nav";
import SectionInfo from "./SectionInfo";
import Prefectures from "./Prefectures";
import ChatBotButton from "./ChatBot";

const HomePage = ({ prefectures }) => {
  return (
    <div>
      <Nav />
      {/* Hero Section */}
      <div className="relative">
        <img
          className="h-screen object-cover w-full"
          src="/assets/pexels-liger-pham-232622-1108701.jpg"
          alt=""
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 text-center text-white w-full">
          <h1 className="text-6xl font-bold mb-4">
            Discover Japan’s 47 Prefectures.
          </h1>
          <h2 className="text-2xl font-bold mb-4">
            Explore the unique culture, history, and beauty of each region.
          </h2>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300">
            Explore
          </button>
        </div>
      </div>
      <ChatBotButton />
      <SectionInfo />
      <Prefectures prefectures={prefectures} />
    </div>
  );
};

export default HomePage;
