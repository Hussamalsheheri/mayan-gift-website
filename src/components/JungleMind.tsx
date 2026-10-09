"use client";
import { useState, FormEvent, useRef, useEffect } from 'react';

type Message = { role: 'user' | 'model', text: string };

export default function JungleMind() {
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    setChatMessage("");
    
    const newMessages: Message[] = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: newMessages })
      });
      if (!res.ok) {
        setMessages(prev => [...prev, { role: 'model', text: "Oops, my heart skipped a beat and I couldn't answer. Try again." }]);
        return;
      }
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "Oops, my heart skipped a beat and I couldn't answer. Try again." }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Oops, my heart skipped a beat and I couldn't answer. Try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="jm-hero font-poppins">
      <div className="jm-hero__bg">
        <video 
          autoPlay muted loop playsInline 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260831_232706_43757be4-2250-4f09-8cd7-23aebbf147ad.mp4" 
        />
      </div>

      <div className="jm-stage flex flex-col justify-end pb-8" style={{ height: '100%' }}>
        
        {messages.length === 0 && !isTyping ? (
          <div className="mb-auto mt-20">
            <h1 className="jm-headline">
              The AI that knows<br className="jm-brk" /> how much I love you.
            </h1>
            <p className="jm-sub">
              This AI system is programmed to reason through everything carefully before answering.<br className="jm-brk" /> 
              Ask me anything, Mayan. I know all of Husam's secrets.
            </p>
          </div>
        ) : (
          <div ref={scrollContainerRef} className="w-full max-w-3xl mx-auto flex flex-col gap-4 mb-6 max-h-[60vh] overflow-y-auto px-4 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-6 py-4 rounded-[2rem] max-w-[85%] shadow-sm ${msg.role === 'user' ? 'bg-[#1a1a1a] text-white rounded-br-sm' : 'bg-white/80 backdrop-blur-lg text-[#111] rounded-bl-sm border border-white/30'}`}>
                  <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
               <div className="flex w-full justify-start">
                <div className="px-6 py-5 rounded-[2rem] max-w-[85%] shadow-sm bg-white/80 backdrop-blur-lg text-[#111] rounded-bl-sm border border-white/30 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black/40 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                  <span className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                </div>
              </div>
            )}
          </div>
        )}

        <form className="jm-prompt mt-auto shrink-0" onSubmit={handleChatSubmit}>
          <label className="sr-only" htmlFor="prompt-input">Ask JungleMind</label>
          <textarea 
            id="prompt-input" 
            className="jm-prompt__input" 
            rows={2} 
            placeholder="Ask me anything, Mayan..." 
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleChatSubmit(e);
              }
            }}
          />
          <div className="jm-prompt__bar">
            {/* Attachment and mic removed */}
            <div className="jm-prompt__right" style={{ marginLeft: 'auto' }}>
              <button type="submit" className="jm-icon-btn jm-icon-btn--send" aria-label="Send message" disabled={isTyping}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h15M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
