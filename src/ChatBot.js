import { useState } from "react";

export default function ChatBotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const data = await res.json();
      const aiMsg = {
        role: "assistant",
        content: data.answer || "No response received",
      };
      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-white p-3 rounded-full h-2"
        >
          💬
        </button>
      ) : (
        <div className="w-80 max-h-[90vh] flex flex-col bg-white border shadow-lg rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-blue-700 text-white">
            <h3 className="font-semibold">NihonKen AI</h3>
            <button onClick={() => setIsOpen(false)}>x</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] text-sm p-2 rounded-md ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-100  text-right"
                    : "mr-auto bg-gray-200"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="text-sm bg-gray-200 p-2 rounded-md max-w-[70%] mr-auto animate-pulse">
                Typing...
              </div>
            )}
          </div>

          <div className="flex items-center border-t p-2 gap-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              placeholder="Ask me anything about Japan.."
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none text-sm"
            />
            <button
              onClick={handleAsk}
              className="bg-blue-700 text-white px-3 py-2 rounded-md hover:bg-blue-400 text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
