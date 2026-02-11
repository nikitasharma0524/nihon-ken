import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Nav from "./Nav";
import SectionInfo from "./SectionInfo";
import Prefectures from "./Prefectures";
import ChatBotButton from "./ChatBot";

export default function HomePage({ prefectures }) {
  const prefecturesRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const handleExploreClick = () => {
    prefecturesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <Nav />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] md:min-h-screen overflow-hidden text-white"
      >
        {/* Parallax Background - Main */}
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/assets/nihonkenbg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </motion.div>

        {/* Full Background - Lanterns overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/assets/japan-lanterns.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Blending gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 mx-auto flex h-full min-h-[85vh] max-w-7xl items-center px-4 sm:px-6 md:px-10 text-white"
        >
          <div className="grid w-full grid-cols-1 items-center gap-6 sm:gap-8 md:gap-10 md:grid-cols-2">
            {/* Left copy */}
            <div className="max-w-2xl text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8 text-left"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  Discover Japan's 47 Prefectures.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-3 sm:mt-4 text-sm leading-relaxed text-neutral-200 sm:text-base md:text-lg lg:text-xl"
                >
                  Explore the unique culture, history, and beauty of each
                  region.
                </motion.p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExploreClick}
                className="group inline-flex items-center justify-center rounded-md border-2 border-white/70 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium tracking-wide backdrop-blur transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Find out more"
              >
                Find out more
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↓
                </motion.span>
              </motion.button>
            </div>

            {/* Right side - empty for balance */}
            <div className="hidden md:block" />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/70 text-xs tracking-widest"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase">Scroll</span>
              <span className="text-2xl">↓</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <ChatBotButton />
      <SectionInfo />

      <div ref={prefecturesRef}>
        <Prefectures prefectures={prefectures} />
      </div>
    </div>
  );
}
