import React, { useState, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";

export default function AIChat() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      const observer = new MutationObserver(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      });

      observer.observe(chatContainerRef.current, {
        childList: true,
        subtree: true,
        characterData: true
      });

      return () => observer.disconnect();
    }
  }, []);

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    setIsTyping(false);
  }

  return (
    <div className="bg-zinc-900 text-white rounded-xl p-2 shadow-lg h-[28rem] flex flex-col overflow-hidden max-w-6xl mx-auto font-quicksand">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-2 space-y-4">
        {messages.map((m, i) => {
          const isLast = i === messages.length - 1;

          return (
            <div
              key={i}
              className={`flex items-start gap-2 my-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "ai" && (
                <div className="text-xl">
                  <img
                    src="/assets/images/profile/me.png"
                    alt="Profile"
                    className="rounded-2xl w-7 h-7 object-cover object-top"
                  />
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-lg inline-block max-w-[80%] ${m.sender === "user" ? "bg-green-900 text-right" : "bg-zinc-800 text-left"
                  }`}
              >
                {m.sender === "ai" && isLast ? (
                  <TypeAnimation 
                    sequence={[m.text]} 
                    wrapper="span" 
                    speed={50} 
                    cursor={false}
                    className="whitespace-pre-wrap"
                    repeat={0}
                  />
                ) : (
                  <span>{m.text}</span>
                )}
              </div>
              {m.sender === "user" && <div className="text-xl">You</div>}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="text-xl">💬</div>
            <div className="px-4 py-2 rounded-lg bg-zinc-800 inline-block max-w-[80%]">
              <TypeAnimation sequence={["...", 1000]} speed={50} repeat={Infinity} />
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          className="flex-1 p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-yellow-100 text-neutral-800 px-4 py-2 rounded-lg hover:bg-yellow-200 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
