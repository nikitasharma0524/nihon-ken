import React, { useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Nav from "./Nav";

const SectionInfo = lazy(() => import("./SectionInfo"));
const Prefectures = lazy(() => import("./Prefectures"));
const ChatBotButton = lazy(() => import("./ChatBot"));

// Lanterns photo — right side, journal-paste aesthetic with smudged edges
const JournalPhoto = () => (
  <>
    {/* The photo itself, masked to smudge all edges */}
    <div
      className="absolute inset-y-0 right-0 pointer-events-none select-none"
      style={{ width: "62%", zIndex: 1 }}
    >
      <img
        src="/assets/japan-lanterns.jpg"
        alt=""
        aria-hidden="true"
        className="w-full h-full"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          transform: "rotate(-0.8deg)",
          transformOrigin: "center center",
          WebkitMaskImage:
            "radial-gradient(ellipse 86% 82% at 58% 50%, black 25%, rgba(0,0,0,0.72) 46%, rgba(0,0,0,0.18) 65%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 86% 82% at 58% 50%, black 25%, rgba(0,0,0,0.72) 46%, rgba(0,0,0,0.18) 65%, transparent 80%)",
        }}
      />
    </div>

    {/* Left fade so text stays readable on cream */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 2,
        background:
          "linear-gradient(to right, #F5EFE6 32%, rgba(245,239,230,0.78) 50%, rgba(245,239,230,0.18) 66%, transparent 78%)",
      }}
    />
  </>
);

export default function HomePage({ prefectures }) {
  const prefecturesRef = useRef(null);

  const handleExploreClick = () => {
    prefecturesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE6" }}>
      <Nav />

      {/* Hero */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ backgroundColor: "#F5EFE6", height: "calc(100vh - 3.5rem)" }}
      >
        {/* Journal photo */}
        <JournalPhoto />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-10 py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-xl"
          >
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[11px] tracking-[0.25em] uppercase mb-6 sm:mb-8"
              style={{ color: "#9B9080" }}
            >
              Japan Prefecture Explorer
            </motion.p>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.08] mb-6"
              style={{ color: "#1C1917" }}
            >
              Japan's 47
              <br />
              Prefectures.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-base sm:text-lg leading-relaxed mb-2"
              style={{ color: "#6B5C52" }}
            >
              Explore the unique culture, history, and beauty of each region.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-base sm:text-lg font-medium mb-10 sm:mb-12"
              style={{ color: "#9B2335" }}
            >
              From Hokkaido to Okinawa.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex items-center justify-center gap-5"
            >
              <motion.button
                whileHover={{ backgroundColor: "#1C1917", color: "#F5EFE6" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleExploreClick}
                className="inline-flex items-center gap-2 px-6 py-3 border text-sm font-medium tracking-wide transition-all"
                style={{
                  border: "1.5px solid #1C1917",
                  color: "#1C1917",
                  backgroundColor: "transparent",
                }}
              >
                Explore Prefectures
                <span className="text-base">→</span>
              </motion.button>

              <motion.button
                whileHover={{ color: "#9B2335" }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .getElementById("stats-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-sm underline underline-offset-4 transition-colors"
                style={{ color: "#6B5C52" }}
              >
                About Japan
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "#A89080" }}
          >
            scroll
          </span>
          <motion.div
            animate={{ scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 origin-top"
            style={{ backgroundColor: "#C4A89A" }}
          />
        </motion.div>
      </section>

      <Suspense
        fallback={
          <div
            className="min-h-screen"
            style={{ backgroundColor: "#F5EFE6" }}
          />
        }
      >
        <ChatBotButton />
        <SectionInfo />
        <div ref={prefecturesRef}>
          <Prefectures prefectures={prefectures} />
        </div>
      </Suspense>
    </div>
  );
}
