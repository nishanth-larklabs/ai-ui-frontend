import React, { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "../types";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface ChatPanelProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

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
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 bg-white">
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <Bot size={18} className="text-teal-600" />
          AI UI Builder
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Describe the UI you want to build
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            <div className="text-center space-y-2">
              <Bot size={32} className="mx-auto text-gray-300" />
              <p>Start by describing a UI you'd like to build.</p>
              <p className="text-xs text-gray-300">
                e.g. "A login page with email and password inputs"
              </p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role !== "user" && (
              <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot size={14} className="text-teal-600" />
              </div>
            )}
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-teal-600 text-white rounded-tr-md"
                  : msg.role === "system"
                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                    : "bg-white text-gray-700 border border-gray-200 rounded-tl-md"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <User size={14} className="text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-teal-600" />
            </div>
            <div className="bg-white text-gray-500 border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-md text-sm flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-teal-500" />
              Thinking about layout...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 border-t border-gray-200 bg-white"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe a UI or ask for changes..."
            disabled={isLoading}
            className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;
