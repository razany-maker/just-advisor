import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, RefreshCw, Sparkles, Zap } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import justLogo from "../../imports/png-transparent-jordan-university-of-science-and-technology-higher-education-student-academic-degree-science-and-technology-text-people-logo-thumbnail.png";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  time: Date;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hey Bushra! 👋 I'm your CS Academic Advisor. How can I help you crush your classes this semester?",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      text: input,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: "Based on your stellar progress, I'd say jump into Data Structures (CS211) next! Want to see the prerequisites or the course tree?",
        time: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now().toString(),
        type: "bot",
        text: "Chat cleared! Let's start fresh. ✨ What's on your mind?",
        time: new Date(),
      },
    ]);
  };

  return (
    <div className="h-full flex flex-col relative w-full">
      <div className="p-6 md:px-10 md:py-8 border-b border-white/40 bg-white/30 backdrop-blur-md flex justify-between items-center z-10 sticky top-0">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-md border border-[#263C74]/10 flex items-center justify-center relative transform transition-transform hover:scale-105 hover:rotate-3">
            <ImageWithFallback src={justLogo} alt="Bot" className="w-10 h-10 object-contain drop-shadow-sm" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1F2D4D] flex items-center">
              Advising Assistant <Sparkles className="w-5 h-5 ml-2 text-yellow-500" />
            </h1>
            <p className="text-[#263C74] font-semibold text-sm opacity-80">Always online & ready to help</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-3 rounded-2xl bg-white hover:bg-[#D03028] text-[#1F2D4D] hover:text-white shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md hover:scale-105 group"
          title="Reset Chat"
        >
          <RefreshCw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth relative z-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-4 fade-in duration-300`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center mt-auto shadow-md ${
                msg.type === "user" ? "bg-gradient-to-br from-[#D03028] to-[#9B231D] text-white" : "bg-white border border-[#263C74]/10 p-1"
              }`}>
                {msg.type === "user" ? (
                  <User className="w-5 h-5" />
                ) : (
                  <ImageWithFallback src={justLogo} alt="Bot" className="w-full h-full object-contain" />
                )}
              </div>
              
              {/* Bubble */}
              <div className={`relative px-6 py-4 shadow-sm font-medium text-[15px] ${
                msg.type === "user" 
                  ? "bg-gradient-to-br from-[#263C74] to-[#1F2D4D] text-white rounded-3xl rounded-br-sm border border-[#263C74]" 
                  : "bg-white text-[#1F2D4D] rounded-3xl rounded-bl-sm border border-[#263C74]/10"
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <span className={`text-[11px] font-bold mt-2 block ${
                  msg.type === "user" ? "text-blue-200" : "text-[#263C74]/50"
                }`}>
                  {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-6 md:p-8 bg-white/60 backdrop-blur-xl border-t border-white/50 sticky bottom-0 z-10">
        <form onSubmit={handleSend} className="relative flex items-center max-w-4xl mx-auto group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="w-full bg-white text-[#1F2D4D] rounded-full pl-6 pr-16 py-4 md:py-5 outline-none focus:ring-4 focus:ring-[#263C74]/20 border-2 border-[#E7ECF0] focus:border-[#263C74] transition-all font-semibold shadow-sm hover:border-[#263C74]/40"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-[#D03028] hover:bg-[#9B231D] disabled:bg-[#E7ECF0] disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            <Zap className="w-5 h-5 md:w-6 md:h-6" fill={input.trim() ? "currentColor" : "none"} />
          </button>
        </form>
      </div>
    </div>
  );
}
