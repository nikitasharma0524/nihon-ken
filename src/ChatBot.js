import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

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

      if (!res.ok) throw new Error(`Server error: ${res.status} ${res.statusText}`);

      const data = await res.json();
      const aiMsg = {
        role: "assistant",
        content: data.answer || data.response || data.message || "No response received.",
      };
      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${err.message || "Something went wrong. Please try again."}`,
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen ? (
          /* ── FAB ── */
          <motion.button
            key="chat-button"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors"
            style={{ backgroundColor: "#1C1917" }}
          >
            <span className="font-serif text-xl leading-none" style={{ color: "#F5EFE6" }}>
              話
            </span>
            {/* Pulse dot */}
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
              style={{ backgroundColor: "#9B2335", borderColor: "#F5EFE6" }}
              animate={{ scale: [1, 1.35, 1], opacity: [1, 0.75, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        ) : (
          /* ── Chat Window ── */
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[620px] z-50 flex flex-col overflow-hidden shadow-2xl sm:rounded-2xl"
            style={{
              backgroundColor: "#F5EFE6",
              border: "1.5px solid #D5C5B5",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ backgroundColor: "#1C1917", borderBottom: "1px solid #2E2A26" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-serif text-base flex-shrink-0"
                  style={{ backgroundColor: "#9B2335", color: "#F5EFE6" }}
                >
                  話
                </div>
                <div>
                  <h3 className="font-serif text-base tracking-wide" style={{ color: "#F5EFE6" }}>
                    NihonKen AI
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: "#6BBF8A" }}
                    />
                    <p className="text-[10px] tracking-widest uppercase" style={{ color: "#9B9080" }}>
                      Online
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                style={{ color: "#9B9080" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5EFE6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9B9080")}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-5 space-y-4 text-left"
              style={{ backgroundColor: "#F5EFE6" }}
            >
              {chatHistory.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-center mt-16 sm:mt-24 px-4"
                >
                  <p
                    className="font-serif text-5xl mb-5 select-none"
                    style={{ color: "#C4A89A" }}
                    aria-hidden="true"
                  >
                    日
                  </p>
                  <h3 className="font-serif text-xl mb-2" style={{ color: "#1C1917" }}>
                    Ask about Japan
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#9B9080" }}>
                    Culture · History · Food · Places
                  </p>
                </motion.div>
              )}

              {chatHistory.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif"
                    style={
                      msg.role === "user"
                        ? { backgroundColor: "#1C1917", color: "#F5EFE6" }
                        : { backgroundColor: "#9B2335", color: "#F5EFE6" }
                    }
                  >
                    {msg.role === "user" ? "人" : "話"}
                  </div>

                  {/* Bubble */}
                  <div
                    className="max-w-[78%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words text-left"
                    style={
                      msg.role === "user"
                        ? {
                            backgroundColor: "#1C1917",
                            color: "#F5EFE6",
                            borderRadius: "12px 12px 2px 12px",
                          }
                        : {
                            backgroundColor: "#FDF8F3",
                            color: "#1C1917",
                            border: "1px solid #E5D5C8",
                            borderRadius: "12px 12px 12px 2px",
                          }
                    }
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading dots */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif"
                    style={{ backgroundColor: "#9B2335", color: "#F5EFE6" }}
                  >
                    話
                  </div>
                  <div
                    className="px-4 py-3"
                    style={{
                      backgroundColor: "#FDF8F3",
                      border: "1px solid #E5D5C8",
                      borderRadius: "12px 12px 12px 2px",
                    }}
                  >
                    <div className="flex gap-1.5 items-center">
                      {[0, 0.18, 0.36].map((delay, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#C4A89A" }}
                          animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{
                borderTop: "1px solid #E5D5C8",
                backgroundColor: "#F5EFE6",
              }}
            >
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && handleAsk()}
                placeholder="Ask about prefectures…"
                disabled={loading}
                className="flex-1 px-4 py-2.5 text-sm focus:outline-none transition-all disabled:opacity-50"
                style={{
                  backgroundColor: "#FDF8F3",
                  color: "#1C1917",
                  border: "1.5px solid #C4A89A",
                  borderRadius: "8px",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#9B2335")}
                onBlur={(e) => (e.target.style.borderColor = "#C4A89A")}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAsk}
                disabled={loading || !prompt.trim()}
                className="px-4 py-2.5 text-sm font-medium tracking-wide transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "#1C1917",
                  color: "#F5EFE6",
                  borderRadius: "8px",
                  minWidth: "56px",
                }}
              >
                {loading ? "…" : "Send"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
