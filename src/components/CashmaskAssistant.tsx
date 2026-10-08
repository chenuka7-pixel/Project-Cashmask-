import React, { useState, useRef, useEffect } from 'react';
import { Shield, Send, X, Sparkles } from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../utils/chatApi';
import { GameProfile } from '../data/taxonomyData';

interface CashmaskAssistantProps {
  initialProfileQuery?: GameProfile | null;
  onClearInitialQuery?: () => void;
}

export const CashmaskAssistant: React.FC<CashmaskAssistantProps> = ({
  initialProfileQuery,
  onClearInitialQuery
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I can help you understand game classifications, risks and provide guidance. Ask me anything about a game.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptChips = [
    'Which games are T6?',
    'What are loot boxes?',
    'How do you determine risk?',
    'Guidance for parents'
  ];

  // Auto-fill query when user inspects a game from research
  useEffect(() => {
    if (initialProfileQuery) {
      const q = `What is the risk classification and tier for ${initialProfileQuery.name} (${initialProfileQuery.representativeTitle})?`;
      setInput(q);
      handleSend(q);
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
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendChatMessage(nextMessages);
      setMessages([...nextMessages, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: `⚠️ Could not reach Cashmask Assistant (${err.message || 'Network error'}). Please try again.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0a3528',
          color: '#ffffff',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '30px',
          boxShadow: '0 8px 24px rgba(10, 53, 40, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.875rem',
          zIndex: 40
        }}
      >
        <Shield size={18} />
        <span>Cashmask Assistant</span>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
      </button>
    );
  }

  return (
    <div style={{
      width: '320px',
      flexShrink: 0,
      background: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
      display: 'flex',
      flexDirection: 'column',
      height: '630px',
      alignSelf: 'flex-start'
    }}>
      {/* Header (Matching Dark Emerald Top) */}
      <div style={{
        background: '#0a3528',
        color: '#ffffff',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Shield size={16} color="#6ee7b7" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.2 }}>
              Cashmask Assistant
            </div>
            <div style={{ fontSize: '0.675rem', color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              <span>Online</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsMinimized(true)}
          title="Minimize assistant"
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {messages.map((m, idx) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: isUser ? 'flex-end' : 'flex-start'
              }}
            >
              {!isUser && (
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#0a3528',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <Shield size={12} color="#fff" />
                </div>
              )}

              <div style={{
                background: isUser ? '#0a3528' : '#fdf8f0',
                color: isUser ? '#ffffff' : '#374151',
                border: isUser ? 'none' : '1px solid #fde68a',
                padding: '11px 14px',
                borderRadius: '16px',
                fontSize: '0.825rem',
                lineHeight: 1.45,
                maxWidth: '85%',
                wordBreak: 'break-word',
                whiteSpace: 'pre-line'
              }}>
                {m.content}
              </div>
            </div>
          );
        })}

        {loading && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#0a3528',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={12} color="#6ee7b7" />
            </div>
            <div style={{
              background: '#fdf8f0',
              border: '1px solid #fde68a',
              borderRadius: '14px',
              padding: '8px 12px',
              fontSize: '0.75rem',
              color: '#92400e'
            }}>
              Analyzing research dataset via GPT-4o...
            </div>
          </div>
        )}

        {/* Prompt Chips (Always accessible above input when conversation has 1-2 messages) */}
        {messages.length <= 2 && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Suggested Inquiries:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {promptChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #bfdbfe',
                    color: '#1d4ed8',
                    padding: '5px 12px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#eff6ff';
                    e.currentTarget.style.borderColor = '#93c5fd';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.borderColor = '#bfdbfe';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        padding: '12px 14px 10px',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        background: '#ffffff'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#fdf8f0',
          border: '1px solid #fed7aa',
          borderRadius: '24px',
          padding: '4px 6px 4px 14px'
        }}>
          <input
            type="text"
            placeholder="Ask a question..."
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
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '0.825rem',
              color: '#111827'
            }}
          />

          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#0a3528',
              color: '#ffffff',
              border: 'none',
              cursor: loading || !input.trim() ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: loading || !input.trim() ? 0.4 : 1,
              transition: 'all 0.15s ease'
            }}
          >
            <Send size={14} />
          </button>
        </div>

        {/* Footer Disclaimer Note */}
        <div style={{
          textAlign: 'center',
          fontSize: '0.625rem',
          color: '#9ca3af',
          marginTop: '8px',
          lineHeight: 1.2
        }}>
          Cashmask Assistant can make mistakes. Verify information from sources.
        </div>
      </div>
    </div>
  );
};
