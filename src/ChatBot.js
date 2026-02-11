import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const handleAsk = async () => {
    if (!prompt.trim()) return;

    const userMsg = { role: "user", content: prompt };
    setChatHistory((prev) => [...prev, userMsg]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("https://nihonken.onrender.com/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log("API Response:", data); // Debug log

      const aiMsg = {
        role: "assistant",
        content: data.answer || data.response || data.message || "No response received from Groq",
      };
      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("API Error:", err); // Debug log
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${err.message || "Something went wrong. The server might be starting up (Render free tier) or experiencing issues. Please try again in a moment."}`
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            key="chat-button"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-amber-800 to-amber-900 text-white p-5 rounded-full shadow-2xl hover:shadow-amber-800/50 transition-all duration-300 border-2 border-amber-700"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <span className="text-3xl">🏯</span>
            </motion.div>
            {/* Notification pulse */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        ) : (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[650px] z-50 flex flex-col bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 sm:rounded-3xl overflow-hidden shadow-2xl sm:border-2 sm:border-amber-800/60"
          >
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative flex items-center justify-between px-5 py-4 bg-gradient-to-r from-amber-900/40 via-amber-800/30 to-amber-900/40 backdrop-blur-xl text-amber-50 border-b border-amber-700/50 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-3xl filter drop-shadow-lg"
                >
                  🏯
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg tracking-wide">NihonKen AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <p className="text-xs text-amber-100/80 font-medium">Online</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-900/40 hover:bg-amber-800/60 transition-all border border-amber-700/50 shadow-md"
              >
                <span className="text-2xl font-light text-amber-100">×</span>
              </motion.button>
            </motion.div>

            {/* Chat Messages */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/40 via-neutral-900 to-neutral-900">
              {chatHistory.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mt-20 sm:mt-32"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-7xl mb-6 filter drop-shadow-2xl"
                  >
                    🗾
                  </motion.div>
                  <h3 className="text-xl font-bold text-amber-50 mb-2">Welcome to NihonKen AI</h3>
                  <p className="text-sm text-amber-200/80 mb-1">Ask about Japan's prefectures!</p>
                  <p className="text-xs text-amber-300/50">Culture • History • Food • Places</p>
                </motion.div>
              )}

              {chatHistory.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-end gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xl shadow-lg ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-amber-700 to-amber-900 border-2 border-amber-600"
                        : "bg-gradient-to-br from-neutral-700 to-neutral-800 border-2 border-amber-700/50"
                    }`}
                  >
                    {msg.role === "user" ? "👤" : "🏯"}
                  </motion.div>

                  {/* Message Bubble */}
                  <motion.div
                    initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`max-w-[80%] p-3.5 rounded-2xl shadow-lg backdrop-blur-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-amber-800/80 to-amber-900/90 text-amber-50 rounded-br-md border border-amber-700/50"
                        : "bg-gradient-to-br from-neutral-800/90 to-neutral-900/90 text-amber-50 rounded-bl-md border border-amber-700/30"
                    }`}
                  >
                    <p className="leading-relaxed text-sm text-left whitespace-pre-wrap break-words">{msg.content}</p>
                  </motion.div>
                </motion.div>
              ))}

              {/* Loading Animation */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 border-2 border-amber-700/50 flex items-center justify-center text-xl shadow-lg"
                  >
                    🏯
                  </motion.div>
                  <div className="bg-gradient-to-br from-neutral-800/90 to-neutral-900/90 p-4 rounded-2xl rounded-bl-md shadow-lg border border-amber-700/30">
                    <div className="flex gap-1.5">
                      <motion.div
                        className="w-2.5 h-2.5 bg-amber-600 rounded-full shadow-lg shadow-amber-600/50"
                        animate={{ y: [0, -10, 0], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50"
                        animate={{ y: [0, -10, 0], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.div
                        className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"
                        animate={{ y: [0, -10, 0], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="border-t border-amber-700/40 p-4 bg-gradient-to-t from-neutral-900 via-neutral-800/50 to-neutral-800/30 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex-1 relative">
                  <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !loading && handleAsk()}
                    placeholder="Ask about prefectures... 🏯"
                    disabled={loading}
                    className="w-full px-5 py-3.5 border-2 border-amber-700/40 rounded-2xl focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-neutral-900/60 text-amber-50 placeholder-amber-300/40 shadow-inner"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)" }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleAsk}
                  disabled={loading || !prompt.trim()}
                  className="bg-gradient-to-br from-amber-700 to-amber-900 text-white px-6 py-3.5 rounded-2xl font-semibold shadow-lg hover:shadow-amber-700/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-amber-600/50"
                >
                  {loading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      ⏳
                    </motion.span>
                  ) : (
                    <span>Send</span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
