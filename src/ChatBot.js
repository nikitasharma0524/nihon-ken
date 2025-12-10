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
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            key="chat-button"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="relative bg-neutral-800/95 backdrop-blur-md text-amber-50 p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 border-2 border-amber-900/50"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <span className="text-3xl">🏯</span>
            </motion.div>
            {/* Notification pulse */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-amber-800 rounded-full border-2 border-neutral-800"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        ) : (
          <motion.div
            key="chat-window"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-96 h-[600px] flex flex-col bg-neutral-800/95 backdrop-blur-md border-2 border-amber-900/50 shadow-2xl rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="relative flex items-center justify-between px-6 py-4 bg-neutral-800/90 backdrop-blur-md text-amber-50 border-b border-amber-900/50"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-3xl"
                >
                  🏯
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg">NihonKen AI</h3>
                  <p className="text-xs text-amber-200/70">Your Japan Expert</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-amber-900/30 transition-colors"
              >
                <span className="text-xl font-bold text-amber-200">×</span>
              </motion.button>
            </motion.div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-900">
              {chatHistory.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-amber-200/70 mt-20"
                >
                  <div className="text-6xl mb-4">🗾</div>
                  <p className="text-sm font-medium text-amber-100">Ask me anything about Japan!</p>
                  <p className="text-xs mt-2 text-amber-200/50">Prefectures, culture, food, and more...</p>
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
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                      msg.role === "user"
                        ? "bg-amber-900/50"
                        : "bg-neutral-800 border border-amber-900/50"
                    }`}
                  >
                    {msg.role === "user" ? "👤" : "🏯"}
                  </motion.div>

                  {/* Message Bubble */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-[75%] text-sm p-3 rounded-2xl shadow-sm ${
                      msg.role === "user"
                        ? "bg-amber-900/50 text-amber-50 rounded-br-sm"
                        : "bg-neutral-800 text-amber-50 rounded-bl-sm border border-amber-900/50"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.content}</p>
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 border border-amber-900/50 flex items-center justify-center text-lg">
                    🏯
                  </div>
                  <div className="bg-neutral-800 p-3 rounded-2xl rounded-bl-sm shadow-sm border border-amber-900/50">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-amber-800 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-amber-700 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-amber-600 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="border-t border-amber-900/50 p-4 bg-neutral-800/90 backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !loading && handleAsk()}
                  placeholder="Ask about Japan... 🗾"
                  disabled={loading}
                  className="flex-1 px-4 py-3 border border-amber-900/50 rounded-full focus:outline-none focus:border-amber-800 text-sm transition-colors disabled:bg-neutral-700 disabled:cursor-not-allowed bg-neutral-900 text-amber-50 placeholder-amber-200/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAsk}
                  disabled={loading || !prompt.trim()}
                  className="bg-amber-900/70 text-amber-50 px-5 py-3 rounded-full hover:bg-amber-800/80 text-sm font-medium shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border border-amber-900/50"
                >
                  {loading ? "..." : "Send"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
