import React, { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "../types";
import { Send, User, ArrowUpRight } from "lucide-react";

interface ChatPanelProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

const SUGGESTIONS = [
  "A login page with email and password",
  "A dashboard with analytics cards",
  "A pricing table with three tiers",
];

const ChatPanel = ({
  messages,
  isLoading,
  onSendMessage,
}: ChatPanelProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSendMessage(trimmed);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-[300px] space-y-5">
              <div className="space-y-2">
                <h3 className="text-[17px] font-medium text-[#2D2B26] tracking-[-0.02em]">
                  What would you like to build?
                </h3>
                <p className="text-[13px] text-[#8C8780] leading-relaxed">
                  Describe a UI component and I'll generate it using
                  the component library.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => onSendMessage(s)}
                    className="group flex items-center justify-between text-left px-3.5 py-2.5 rounded-xl text-[13px] text-[#5C5850] border border-[#E0DAD0] bg-[#FFFFF8] hover:bg-[#F5F0E8] hover:border-[#D5D0C8] transition-colors duration-150 cursor-pointer"
                  >
                    <span>{s}</span>
                    <ArrowUpRight size={13} className="text-[#D5D0C8] group-hover:text-[#B5AFA5] transition-colors shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role !== "user" && (
                  <div className="w-6 h-6 rounded-full bg-[#D4A27F] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[9px] font-bold text-white">AI</span>
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-[1.6] ${
                    msg.role === "user"
                      ? "bg-[#EDE7DF] text-[#2D2B26] rounded-2xl rounded-br-md"
                      : msg.role === "system"
                        ? "bg-amber-50/80 text-amber-900 border border-amber-200/60 rounded-xl text-[12px]"
                        : "bg-[#FFFFF8] text-[#3D3B35] rounded-2xl rounded-bl-md border border-[#E8E3DB]"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-[#5C5850] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={11} className="text-white" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-[#D4A27F] flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-white">AI</span>
                </div>
                <div className="bg-[#FFFFF8] border border-[#E8E3DB] text-[#8C8780] px-4 py-3 rounded-2xl rounded-bl-md text-[13px] flex items-center gap-1.5">
                  <span className="inline-block w-1 h-1 rounded-full bg-[#D4A27F]" style={{ animation: "dotPulse 1.4s ease-in-out 0s infinite" }} />
                  <span className="inline-block w-1 h-1 rounded-full bg-[#D4A27F]" style={{ animation: "dotPulse 1.4s ease-in-out 0.2s infinite" }} />
                  <span className="inline-block w-1 h-1 rounded-full bg-[#D4A27F]" style={{ animation: "dotPulse 1.4s ease-in-out 0.4s infinite" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 border-t border-[#E8E3DB]"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe a UI..."
            disabled={isLoading}
            className="flex-1 px-3.5 py-2 bg-[#F0ECE4] border border-transparent rounded-xl text-[13px] text-[#2D2B26] placeholder-[#B5AFA5] focus:outline-none focus:bg-[#FFFFF8] focus:border-[#D5D0C8] focus:ring-1 focus:ring-[#D4A27F]/20 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-9 h-9 flex items-center justify-center bg-[#D4A27F] text-white rounded-xl hover:bg-[#C4926F] active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send size={14} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;
