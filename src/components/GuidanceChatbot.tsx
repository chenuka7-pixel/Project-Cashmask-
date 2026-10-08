import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage, ChatMessage } from '../utils/chatApi';
import { GameProfile } from '../data/taxonomyData';
import { 
  Send, 
  Bot, 
  User, 
  Trash2, 
  PhoneCall, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2,
  Copy
} from 'lucide-react';

interface GuidanceChatbotProps {
  initialProfileQuery?: GameProfile | null;
  onClearInitialQuery?: () => void;
}

export const GuidanceChatbot: React.FC<GuidanceChatbotProps> = ({ 
  initialProfileQuery,
  onClearInitialQuery 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hello! I am the **CSG3101 Socio-Technical Guidance Chatbot**, grounded exclusively in the Edith Cowan University research dataset on online games for cash.

I can guide you on:
• **Tier Classifications (T0–T6):** Whether real money can actually be extracted.
• **Predatory Mechanics:** Loot boxes, skin trading, chip abstraction, and loss velocity.
• **Regulatory Status:** Unlicensed offshore sites vs Australian Interactive Gambling Act 2001 (Cth).
• **Evaluated Dossiers:** CSCase.com, CSGOLuck, 8 Ball Pool, Bingo Blitz, Zynga Poker, Online Casino, and Melbet.

*How can I assist your research today?*`
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-trigger inquiry if launched from game dossier drawer
  useEffect(() => {
    if (initialProfileQuery) {
      const queryText = `Can you provide a full socio-technical breakdown of ${initialProfileQuery.name} (${initialProfileQuery.representativeTitle})? What is its Tier, harm score, and regulatory status in Australia?`;
      setInput(queryText);
      handleSend(queryText);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialProfileQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: textToSend.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      // Send chat history to OpenRouter GPT-4o
      const replyContent = await sendChatMessage(updatedMessages);
      setMessages([...updatedMessages, { role: 'assistant', content: replyContent }]);
    } catch (err: any) {
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: `⚠️ **Chatbot Error:** Unable to connect to OpenRouter (${err.message || 'Network error'}). Please verify network connectivity or check API configuration.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Chat history cleared. Grounded in the CSG3101 research dataset. How can I help?`
      }
    ]);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const starterPrompts = [
    "Is CSGOLuck legal in Australia?",
    "Can money be withdrawn from 8 Ball Pool?",
    "Why is Melbet classified as T6?",
    "What tier is Bingo Blitz and why was it sued?",
    "What is the difference between T2 and T6?"
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px 48px' }}>
      {/* Crisis Protocol Header Banner */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '12px',
        padding: '12px 18px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldAlert size={20} color="#f87171" />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fecaca' }}>
              Australian Problem Gambling Support Services
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Free, confidential 24/7 counseling is available for anyone affected by gambling harms.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <a
            href="tel:1800858858"
            style={{
              background: '#ef4444',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <PhoneCall size={13} />
            <span>1800 858 858</span>
          </a>
          <a
            href="https://www.betstop.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            BetStop Register
          </a>
        </div>
      </div>

      {/* Main Chat Interface Container */}
      <div className="glass-panel" style={{
        display: 'flex',
        flexDirection: 'column',
        height: '680px',
        overflow: 'hidden'
      }}>
        {/* Chat Header */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(10, 13, 20, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)'
            }}>
              <Bot size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>ECU Socio-Technical Guidance Chatbot</span>
                <span style={{
                  background: 'rgba(99, 102, 241, 0.25)',
                  color: '#a5b4fc',
                  fontSize: '0.65rem',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)'
                }}>
                  OpenRouter • OpenAI GPT-4o
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Retrieval-grounded in unit CSG3101 verified dataset
              </div>
            </div>
          </div>

          <button
            onClick={clearChat}
            title="Clear Chat History"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem'
            }}
          >
            <Trash2 size={14} />
            <span>Clear</span>
          </button>
        </div>

        {/* Chat Message Scroll Window */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {msg.role === 'assistant' && (
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <Bot size={16} color="#fff" />
                </div>
              )}

              <div style={{
                maxWidth: '82%',
                background: msg.role === 'user' ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)',
                border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '0.875rem',
                color: '#ffffff',
                lineHeight: 1.5,
                position: 'relative',
                wordBreak: 'break-word',
                whiteSpace: 'pre-line'
              }}>
                {msg.content}

                {/* Copy button for assistant responses */}
                {msg.role === 'assistant' && (
                  <button
                    onClick={() => copyToClipboard(msg.content, idx)}
                    title="Copy Answer"
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '2px'
                    }}
                  >
                    {copiedIndex === idx ? <CheckCircle2 size={13} color="#10b981" /> : <Copy size={13} />}
                  </button>
                )}
              </div>

              {msg.role === 'user' && (
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <User size={16} color="#cbd5e1" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={16} color="#fff" />
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                padding: '10px 16px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles size={14} color="var(--accent-cyan)" className="pulse-indicator" />
                <span>Consulting verified taxonomy research dataset via GPT-4o...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Chips Bar */}
        <div style={{
          padding: '8px 16px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {starterPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              disabled={loading}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: '0.725rem',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.15s ease'
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat Input Box */}
        <div style={{
          padding: '14px 16px',
          borderTop: '1px solid var(--border-color)',
          background: 'rgba(10, 13, 20, 0.6)',
          display: 'flex',
          gap: '10px'
        }}>
          <input
            type="text"
            placeholder="Ask a question about a game, mechanic, tier, or regulatory rule..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={loading}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-color)',
              color: '#ffffff',
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />

          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="btn-primary"
            style={{ padding: '10px 18px', opacity: loading || !input.trim() ? 0.6 : 1 }}
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
