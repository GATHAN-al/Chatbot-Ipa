// src/components/ChatbotPage.jsx
import React from 'react';

const ChatbotPage = ({ chatInput, setChatInput, handleSendMessage }) => {
  return (
    <>
      {/* --- Tengah: Daftar Sesi Chat --- */}
      <aside className="hidden lg:flex w-72 bg-[#F5F0E8]/50 border-r border-[#D6CFC4] flex-col">
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#D6CFC4] bg-[#FAF7F2] rounded-b-xl">
          <h2 className="font-bold text-lg text-[#2C1A0E]">Sesi Chat</h2>
          <button className="text-xs font-semibold text-[#7A8C5C] bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#D6CFC4] hover:bg-white transition-all shadow-sm">
            + Baru
          </button>
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold text-[#6B5C4E] mb-4 uppercase tracking-wider">Lanjutkan Percakapan</p>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="h-14 bg-[#FAF7F2] border border-[#D6CFC4] rounded-3xl shadow-sm p-4 text-xs font-bold text-[#6B5C4E] flex items-center gap-2">🌱 Eksplorasi Daun & Fotosintesis</div>
            <div className="h-14 bg-[#FAF7F2] border border-[#D6CFC4] rounded-3xl shadow-sm opacity-75 p-4 text-xs font-bold text-[#6B5C4E] flex items-center gap-2">☀️ Misteri Energi Matahari</div>
          </div>
        </div>
      </aside>

      {/* --- Kanan: Area Chat Utama --- */}
      <main className="flex-1 flex flex-col bg-[#F5F0E8] w-full h-[calc(100vh-73px)] md:h-screen">
        <header className="h-auto md:h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-[#7A8C5C] rounded-b-[40px] gap-4 sm:gap-0 sticky top-0 md:relative z-20 shadow-md">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FAF7F2] shrink-0 rounded-full flex items-center justify-center text-[#7A8C5C] font-extrabold text-xl sm:text-2xl shadow-inner border border-[#D6CFC4]">P</div>
            <div className="flex-1">
              <h2 className="font-extrabold text-xl sm:text-2xl text-[#FAF7F2]">Profesor Cerdas</h2>
              <p className="text-xs sm:text-sm text-[#FAF7F2] font-semibold">Siap jawab pertanyaan kamu!</p>
            </div>
          </div>
          <div className="flex items-center w-full sm:w-auto bg-[#FAF7F2] rounded-xl px-1 py-1 border border-[#D6CFC4] shadow-inner">
            <span className="text-[11px] font-semibold text-[#6B5C4E] px-3">Topik saat ini:</span>
            <select className="w-full sm:w-auto text-xs sm:text-sm font-semibold border-none rounded-lg px-3 py-1 bg-transparent text-[#2C1A0E] outline-none">
              <option>Tumbuhan dan fotosintesis</option>
              <option>Sistem Tata Surya</option>
              <option>Lingkungan Hidup</option>
            </select>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 flex flex-col gap-6 bg-[#F5F0E8]">
          <div className="flex flex-col items-end w-full">
            <div className="bg-[#2C1A0E] text-[#FAF7F2] px-5 sm:px-6 py-3.5 rounded-3xl rounded-tr-xl max-w-[85%] sm:max-w-xl shadow-xl border border-[#FAF7F2]/5">
              <p className="text-sm sm:text-base leading-relaxed">Apa fungsi utama jantung dalam tubuh manusia?</p>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-6 max-w-full sm:max-w-3xl items-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#7A8C5C] shrink-0 rounded-full flex items-center justify-center text-[#FAF7F2] font-extrabold text-xl sm:text-2xl mt-1 shadow-md border border-[#D6CFC4]">K</div>
            <div className="flex flex-col gap-3 w-full">
              <div className="bg-[#FAF7F2] border border-[#D6CFC4] px-5 sm:px-6 py-4 rounded-3xl rounded-tl-xl shadow-md">
                <p className="text-sm sm:text-base leading-relaxed text-[#2C1A0E]">
                  Jantung berfungsi memompa darah ke seluruh tubuh agar oksigen dan nutrisi tersebar merata ke semua organ. 🌱
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 ml-1 mt-1">
                <span className="text-[11px] sm:text-xs text-[#6B5C4E] font-medium mr-2 hidden sm:block">Jawaban ini:</span>
                <div className="flex gap-2">
                  <button className="text-xs sm:text-sm font-semibold px-4 py-2 border border-[#D6CFC4] rounded-full text-[#2C1A0E] bg-white hover:bg-[#FAF7F2] shadow-sm">👍 Mudah dipahami</button>
                  <button className="text-xs sm:text-sm font-semibold px-4 py-2 border border-[#D6CFC4] rounded-full text-[#2C1A0E] bg-white hover:bg-[#FDE8DC] shadow-sm">👎 Kurang jelas</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Box Area */}
        <div className="p-6 border-t border-[#D6CFC4] bg-white rounded-t-[40px]">
          <div className="w-full max-w-7xl mx-auto flex items-center gap-3 sm:gap-4">
            <button className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-[#F5F0E8] border border-[#D6CFC4] flex items-center justify-center text-[#6B5C4E] shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className="flex-1 bg-[#F5F0E8] rounded-full flex items-center pr-2 pl-5 py-2 border border-transparent focus-within:border-[#7A8C5C] focus-within:ring-2 focus-within:ring-[#7A8C5C]/30 focus-within:bg-white transition-all shadow-inner justify-between">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tanya Profesor Cerdas di sini..." 
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-[#2C1A0E] placeholder-[#6B5C4E] font-medium"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-[#2C1A0E] text-[#FAF7F2] p-2.5 sm:p-3 rounded-full hover:bg-[#3B2314] transition-all flex items-center justify-center shadow-md shrink-0"
              >
                <svg className="w-4 h-4 sm:w-5 h-5 transform rotate-45 -translate-x-0.5 translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ChatbotPage;