import React, { useRef } from "react";
import Nav from "./Nav";
import SectionInfo from "./SectionInfo";
import Prefectures from "./Prefectures";
import ChatBotButton from "./ChatBot";

// Hero replicates the reference: left-aligned heading + subhead and an outline button,
// soft red-to-dark gradient over a grainy background, with a lantern photo card on the right.
export default function HomePage({ prefectures }) {
  const prefecturesRef = useRef(null);

  const handleExploreClick = () => {
    prefecturesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section
        className="relative min-h-[85vh] md:min-h-screen overflow-hidden text-white"
        style={{
          backgroundImage: "url('/assets/nihonkenbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Background image */}

        {/* Film + red gradient overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40" style={{ backgroundImage: "url(/assets/noise.png)" }} /> */}

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full min-h-[85vh] max-w-7xl items-center px-6 md:px-10 text-white">
          <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Left copy */}
            <div className="max-w-2xl text-left">
              <div className="mb-8 text-left">
                <h1 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  Discover Japan’s 47 Prefectures.
                </h1>
                <p className="mt-4 text-base leading-relaxed text-neutral-200 sm:text-lg md:text-xl">
                  Explore the unique culture, history, and beauty of each
                  region.
                </p>
              </div>

              <button
                onClick={handleExploreClick}
                className="inline-flex items-center justify-center rounded-md border border-white/70 px-5 py-2.5 text-sm font-medium tracking-wide backdrop-blur transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Find out more"
              >
                Find out more
              </button>
            </div>

            {/* Right photo card */}
            <div className="relative hidden md:block">
              <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-black/10 blur-2xl" />
              <div className="relative ml-auto w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <img
                  src="/assets/japan-lanterns.jpg"
                  alt="Narrow alley with Japanese lanterns"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Corner chat bubble space – your <ChatBotButton /> renders later */}
      </section>

      <ChatBotButton />
      <SectionInfo />

      <div ref={prefecturesRef}>
        <Prefectures prefectures={prefectures} />
      </div>
    </div>
  );
}
