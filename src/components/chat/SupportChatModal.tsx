import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, X, Send, Sparkles, Bot, User, Check, Copy, 
  ExternalLink, Truck, Package, ShoppingBag, ArrowRight, RotateCcw, 
  ChevronDown, ShieldCheck, Tag
} from 'lucide-react';
import { ChatMessage, Product, PageRoute } from '../../types';
import { generateMockAIResponse } from '../../services/mockChatService';
import { formatBDT } from '../../utils/formatters';

interface SupportChatModalProps {
  onNavigate: (page: PageRoute) => void;
  onSelectProduct: (product: Product) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_welcome',
    sender: 'assistant',
    text: "Hello! 👋 I'm your Nexus Bazaar AI Concierge. I can help you track parcels across Steadfast & RedX courier, discover curated products in BDT, check bKash/COD payments, or claim promo codes. How can I assist you today?",
    timestamp: Date.now() - 60000,
    suggestedActions: [
      '📦 Track my active parcel',
      '🎟️ Active coupon codes',
      '🎧 Best headphones under ৳5,000',
      '💳 How does bKash / COD work?',
    ],
  },
];

export const SupportChatModal: React.FC<SupportChatModalProps> = ({
  onNavigate,
  onSelectProduct,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return INITIAL_MESSAGES;
    try {
      const saved = localStorage.getItem('nexus_support_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_MESSAGES;
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isTyping]);

  // Persist messages
  useEffect(() => {
    try {
      localStorage.setItem('nexus_support_chat_history', JSON.stringify(messages));
    } catch {
      // Ignore
    }
  }, [messages]);

  // Global trigger event listener
  useEffect(() => {
    const handleOpenChat = (e: Event) => {
      const customEvent = e as CustomEvent<{ product?: Product }>;
      setIsOpen(true);
      if (customEvent.detail?.product) {
        const prod = customEvent.detail.product;
        setTimeout(() => {
          handleSendMessage(`Can you tell me more about ${prod.name}?`);
        }, 300);
      }
    };

    window.addEventListener('nexus_open_support_chat', handleOpenChat);
    return () => window.removeEventListener('nexus_open_support_chat', handleOpenChat);
  }, []);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Realistic typing latency
    setTimeout(() => {
      const response = generateMockAIResponse(text);
      const assistantMsg: ChatMessage = {
        id: `msg_a_${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: Date.now(),
        suggestedActions: response.suggestedActions,
        recommendedProducts: response.recommendedProducts,
        orderInfo: response.orderInfo,
        couponCode: response.couponCode,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  const handleClearHistory = () => {
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem('nexus_support_chat_history');
    } catch {
      // Ignore
    }
  };

  return (
    <>
      {/* 1. Persistent Floating Action Button (FAB) - Positioned above mobile bottom bar */}
      <div className="fixed bottom-20 right-3.5 md:bottom-6 md:right-6 z-40">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-neutral-900/95 backdrop-blur-md hover:bg-neutral-800 text-white rounded-full shadow-2xl hover:shadow-red-500/10 border border-neutral-700/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Chat with AI Customer Support"
          >
            {/* Animated pulsing status indicator */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>

            <MessageCircle className="w-5 h-5 text-red-500 group-hover:rotate-6 transition-transform" />

            <div className="flex flex-col text-left">
              <span className="text-xs font-bold tracking-tight">Chat with Us</span>
              <span className="text-[10px] text-neutral-400 font-medium hidden sm:inline">
                Instant AI Support
              </span>
            </div>

            {/* Unread indicator */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* 2. Interactive Mock AI Chat Modal / Window */}
      {isOpen && (
        <div 
          className="fixed inset-x-2 bottom-16 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:w-[400px] h-[75vh] sm:h-[580px] max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-neutral-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
          role="dialog"
          aria-label="Nexus Support AI Assistant"
        >
          {/* Top Header Bar */}
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-rose-950 text-white p-4 flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-neutral-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-tight">Nexus AI Concierge</h3>
                  <span className="text-[10px] bg-red-600/40 text-rose-200 px-1.5 py-0.2 rounded font-mono">
                    24/7 AI
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                  <span>Steadfast Logistics & Catalog Assistant</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearHistory}
                title="Reset conversation"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Notice Strip */}
          <div className="px-3.5 py-1.5 bg-neutral-100/80 border-b border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-600">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Store Assistant · Pure BDT (৳)</span>
            </span>
            <span className="text-emerald-700 font-semibold font-mono">
              Online
            </span>
          </div>

          {/* Message Thread Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Bubble Container */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-red-600 text-white rounded-br-xs'
                      : 'bg-white text-neutral-800 border border-neutral-200/80 rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line font-normal">
                    {msg.text}
                  </div>

                  {/* Order Tracking Card (Embedded) */}
                  {msg.orderInfo && (
                    <div className="mt-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-neutral-900 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[11px] text-neutral-500">Order #{msg.orderInfo.orderNumber}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          {msg.orderInfo.status}
                        </span>
                      </div>
                      
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-neutral-900">
                          <Truck className="w-3.5 h-3.5 text-red-600" />
                          <span>{msg.orderInfo.courier}</span>
                        </div>
                        <div className="text-[11px] text-neutral-600">
                          Tracking: <code className="font-mono font-bold text-neutral-900">{msg.orderInfo.trackingNumber}</code>
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Step: {msg.orderInfo.step}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-medium">
                          Expected Delivery: {msg.orderInfo.estimatedDelivery}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('dashboard');
                          setIsOpen(false);
                        }}
                        className="w-full mt-1 py-1.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>View Live Timeline in Dashboard</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Product Cards Carousel (Embedded) */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                        Matched Products:
                      </p>
                      <div className="space-y-2">
                        {msg.recommendedProducts.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              onSelectProduct(p);
                              setIsOpen(false);
                            }}
                            className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-200/80 flex items-center justify-between gap-2.5 cursor-pointer transition-all group"
                          >
                            <img
                              src={p.imageUrl}
                              alt={p.name}
                              className="w-11 h-11 rounded-lg object-cover border border-neutral-200 shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-[11px] font-bold text-neutral-900 group-hover:text-red-600 transition-colors truncate">
                                {p.name}
                              </h5>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-bold text-neutral-900 font-mono text-xs">
                                  {formatBDT(p.priceBDT)}
                                </span>
                                <span className="text-[10px] text-emerald-700 font-semibold">
                                  {p.discountPercent}% OFF
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="p-1.5 bg-white text-neutral-700 rounded-lg border border-neutral-200 group-hover:bg-red-600 group-hover:text-white transition-colors"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Coupon Code Pill (Embedded) */}
                  {msg.couponCode && (
                    <div className="mt-2.5 p-2.5 bg-rose-50 rounded-xl border border-rose-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-red-600" />
                        <div>
                          <span className="font-mono font-bold text-xs text-red-700 block">
                            {msg.couponCode}
                          </span>
                          <span className="text-[10px] text-rose-600">৳500 OFF discount</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCoupon(msg.couponCode!)}
                        className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedCoupon === msg.couponCode ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-neutral-400 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>

                {/* Suggested Prompt Chips */}
                {msg.suggestedActions && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.suggestedActions.map((action, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendMessage(action)}
                        className="px-2.5 py-1 bg-white hover:bg-red-50 text-neutral-700 hover:text-red-600 border border-neutral-200/80 rounded-full text-[11px] font-medium transition-all shadow-2xs hover:border-red-200 cursor-pointer text-left"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-neutral-500 bg-white p-3 rounded-2xl rounded-bl-xs border border-neutral-200 w-fit">
                <Bot className="w-3.5 h-3.5 text-red-600 animate-spin" />
                <span>Nexus AI is thinking...</span>
                <span className="flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about orders, products, bKash..."
              className="flex-1 px-3.5 py-2.5 bg-neutral-100 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-red-600 hover:bg-red-700 disabled:bg-neutral-300 text-white rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed shadow-xs"
              title="Send message"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
