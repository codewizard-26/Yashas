import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  CheckCheck 
} from 'lucide-react';
import { MOCK_MESSAGES } from '../../shared/mockData/yashasData';

export default function MessagingPage() {
  const [conversations, setConversations] = useState(MOCK_MESSAGES);
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedConv) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: inputText,
      time: "Just now"
    };

    const updatedConv = {
      ...selectedConv,
      messages: [...selectedConv.messages, newMsg],
      lastMessage: inputText,
      time: "Just now"
    };

    setSelectedConv(updatedConv);
    setConversations(conversations.map(c => c.id === updatedConv.id ? updatedConv : c));
    setInputText('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-white/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3525cd]/10 text-[#3525cd] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0b1c30]">Direct Messages & Campus Chat</h1>
            <p className="text-xs font-semibold text-gray-500">Real-time collaboration with teammates, peers, and mentors.</p>
          </div>
        </div>
      </div>

      {/* Two Panel Chat Interface */}
      <div className="glass-panel rounded-2xl border border-white/80 grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-[600px]">
        
        {/* Left Conversation List (4 cols) */}
        <div className="lg:col-span-4 border-r border-gray-200/80 p-4 space-y-4 bg-white/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search conversations..."
              className="w-full bg-white border border-gray-200 text-[#0b1c30] rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:border-[#3525cd]"
            />
          </div>

          <div className="space-y-2">
            {conversations.map((conv) => {
              const isSelected = selectedConv?.id === conv.id;

              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected 
                      ? 'bg-[#3525cd]/10 border-[#3525cd]/30 shadow-sm' 
                      : 'bg-white/80 border-gray-100 hover:bg-white'
                  }`}
                >
                  <div className="relative">
                    <img src={conv.user.avatar} alt={conv.user.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    {conv.user.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#0b1c30] truncate">{conv.user.name}</h4>
                      <span className="text-[10px] font-semibold text-gray-400">{conv.time}</span>
                    </div>
                    <p className="text-[11px] font-medium text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Window (8 cols) */}
        {selectedConv ? (
          <div className="lg:col-span-8 flex flex-col justify-between bg-white/30">
            {/* Top Bar */}
            <div className="p-4 border-b border-gray-200/80 flex items-center justify-between bg-white/70">
              <div className="flex items-center gap-3">
                <img src={selectedConv.user.avatar} alt={selectedConv.user.name} className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                <div>
                  <h3 className="text-xs font-bold text-[#0b1c30]">{selectedConv.user.name}</h3>
                  <span className="text-[10px] font-semibold text-gray-500">{selectedConv.user.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <button className="p-2 hover:bg-gray-100 rounded-lg"><Phone className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-gray-100 rounded-lg"><Video className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Message History Area */}
            <div className="p-6 space-y-4 overflow-y-auto max-h-[420px] flex-1">
              {selectedConv.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md p-3.5 rounded-2xl text-xs font-medium shadow-sm ${
                    msg.sender === 'me'
                      ? 'bg-[#3525cd] text-white rounded-br-none'
                      : 'bg-white text-[#0b1c30] border border-gray-200 rounded-bl-none'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block mt-1 text-right ${msg.sender === 'me' ? 'text-white/80' : 'text-gray-400'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Composer */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200/80 bg-white/80 flex items-center gap-3">
              <button type="button" className="text-gray-400 hover:text-gray-600"><Paperclip className="w-4 h-4" /></button>
              <input 
                type="text" 
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 text-[#0b1c30] text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#3525cd] font-medium"
              />
              <button type="submit" className="bg-[#3525cd] text-white p-2.5 rounded-xl hover:bg-[#3525cd]/90 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-8 flex items-center justify-center p-12 text-gray-400 text-xs font-semibold">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
