import React, { useState } from 'react';
import AuthModal from './AuthModal';
import QuizFlow from './QuizFlow'; // Sesuaikan dengan nama file kuis kamu
const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Tema Vibe: Earthy, natural, warm, and calm
  // Typography: friendly, rounded, medium-weight

  return (
    // Aturan 8: overflow-x-hidden di layout utama
    // Aturan 2 & 1: mobile-first flex-col, lalu md:flex-row. Global background: Cream #F5F0E8
    <div className="flex flex-col md:flex-row h-screen bg-[#F5F0E8] font-medium text-[#2C1A0E] overflow-x-hidden relative">
      
      {/* --- Aturan 6: Mobile hamburger --- */}
      {/* Diperbaiki: Mobile menu container menjadi bagian dari curved olive section */}
      <div className="md:hidden flex items-center justify-between bg-[#7A8C5C] text-[#FAF7F2] p-4 sticky top-0 z-30 rounded-b-[40px]">
        <div className="flex items-center gap-3">
          {/* Logo 'S' variant: all white/cream */}
          <div className="w-8 h-8 bg-[#FAF7F2] rounded-lg flex items-center justify-center text-[#7A8C5C] font-bold shadow-sm">
            S
          </div>
          {/* Aturan 3: Heading typography, warm brown */}
          <h1 className="font-extrabold text-xl sm:text-2xl text-[#FAF7F2]">SainsCerdas</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-[#FAF7F2] p-2 focus:outline-none focus:ring-2 focus:ring-[#7A8C5C] rounded-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>

      {/* Overlay Sidebar Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#2C1A0E]/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- 1. Kiri: Sidebar Menu Utama --- */}
      {/* Aturan 6: Desktop hidden md:flex (Drawer di mobile) */}
      {/* Sidebar background: Cozy off-white #FAF7F2 */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#FAF7F2] border-r border-[#D6CFC4] flex flex-col justify-between 
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:flex rounded-r-3xl md:rounded-none
      `}>
        <div>
          {/* Header Logo (Hanya muncul di desktop) */}
          <div className="hidden md:flex h-20 items-center px-6 border-b border-[#D6CFC4] bg-[#F5F0E8] rounded-b-xl">
            {/* Logo 'S' variant: Olive with cream white S */}
            <div className="w-10 h-10 bg-[#7A8C5C] rounded-xl flex items-center justify-center text-[#FAF7F2] font-bold mr-3 shadow-md">
              S
            </div>
            <div>
              {/* Aturan 3: Heading Text, warm brown */}
              <h1 className="font-extrabold text-xl sm:text-2xl text-[#2C1A0E] leading-tight">SainsCerdas</h1>
              {/* Aturan 3: Body Text, muted warm brown */}
              <p className="text-xs sm:text-sm text-[#6B5C4E]">Ilmuwan Cilik</p>
            </div>
          </div>

          {/* Aturan 4: Padding navigasi. Jarak lebih lega. */}
          <nav className="p-6 space-y-3 overflow-y-auto mt-2">
            <p className="text-xs font-semibold text-[#6B5C4E] mb-3 px-2 uppercase tracking-wider">Menu Utama</p>
            {/* Active Link: Olive with cream white icon/text */}
            <a href="#" className="flex items-center gap-3 bg-[#7A8C5C] text-[#FAF7F2] px-3 py-3 rounded-full font-semibold text-sm sm:text-base transition-colors shadow-sm">
              <span className="w-6 h-6 bg-[#FAF7F2] rounded-full text-[#7A8C5C] flex items-center justify-center text-xs">H</span>
              Beranda
            </a>
            <a href="#" className="flex items-center gap-3 text-[#6B5C4E] hover:bg-[#FAF7F2] hover:text-[#2C1A0E] hover:border-[#7A8C5C] hover:border hover:p-3 border-transparent border p-3 rounded-full transition-all">
              <span className="w-6 h-6 bg-[#FAF7F2] rounded-full text-[#6B5C4E] flex items-center justify-center text-xs border border-[#D6CFC4]">C</span>
              Chatbot
            </a>
            <a href="#" className="flex items-center gap-3 text-[#6B5C4E] hover:bg-[#FAF7F2] hover:text-[#2C1A0E] hover:border-[#7A8C5C] hover:border hover:p-3 border-transparent border p-3 rounded-full transition-all">
              <span className="w-6 h-6 bg-[#FAF7F2] rounded-full text-[#6B5C4E] flex items-center justify-center text-xs border border-[#D6CFC4]">T</span>
              Topik IPA
            </a>
          </nav>
        </div>

        {/* Challenge Widget: Styled with Olive, Cozy text */}
    {/* Challenge Widget */}
<div className="p-6 mx-4 mb-4 bg-[#7A8C5C] text-[#FAF7F2] rounded-3xl shadow-lg">
  <h3 className="font-bold text-sm mb-1">Tantangan hari ini!</h3>
  <p className="text-xs text-[#FAF7F2]/90 mb-4 leading-relaxed">
    Selesaikan 1 kuis dan dapatkan bintang emas.
  </p>
  <button 
    onClick={() => setIsQuizOpen(true)} // AKTIFKAN KUIS DI SINI
    className="w-full bg-[#FAF7F2] text-[#7A8C5C] text-sm font-semibold py-2 rounded-full hover:bg-white transition-colors shadow-sm"
  >
    Mulai Kuis
  </button>
</div>

        {/* Aturan 5: No harsh borders. soft shadow. */}
        {/* Tombol Pemicu Modal: Primary dark brown CTA spec */}
        <div className="p-6 border-t border-[#D6CFC4]">
          <button 
            onClick={() => setIsAuthModalOpen(true)} 
            className="w-full bg-[#2C1A0E] text-[#FAF7F2] text-sm sm:text-base font-bold py-3 rounded-full hover:bg-[#3B2314] transition-colors shadow-lg focus:ring-4 focus:ring-[#7A8C5C]"
          >
            Masuk / Daftar
          </button>
        </div>
      </aside>

      {/* --- 2. Tengah: Daftar Sesi Chat --- */}
      {/* Aturan 1 & 7: lg:flex. Muted cream variant background. */}
      <aside className="hidden lg:flex w-72 bg-[#F5F0E8]/50 border-r border-[#D6CFC4] flex-col">
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#D6CFC4] bg-[#FAF7F2] rounded-b-xl">
          {/* Aturan 3: Heading text */}
          <h2 className="font-bold text-lg text-[#2C1A0E]">Sesi Chat</h2>
          <button className="text-xs font-semibold text-[#7A8C5C] bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#D6CFC4] hover:bg-white transition-all shadow-sm">
            + Baru
          </button>
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold text-[#6B5C4E] mb-4 uppercase tracking-wider">Lanjutkan Percakapan</p>
          {/* Aturan 4: Gap. cozy Card spec: bg-[#FAF7F2], soft shadow, rounded-3xl */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="h-14 bg-[#FAF7F2] border border-[#D6CFC4] rounded-3xl shadow-sm"></div>
            <div className="h-14 bg-[#FAF7F2] border border-[#D6CFC4] rounded-3xl shadow-sm opacity-75"></div>
          </div>
        </div>
      </aside>

      {/* --- 3. Kanan: Area Chat Utama --- */}
      {/* Aturan 2: w-full. Global background: Cream #F5F0E8 */}
      <main className="flex-1 flex flex-col bg-[#F5F0E8] w-full h-[calc(100vh-73px)] md:h-screen">
        
        {/* Chat Header: styled as curved olive header panel */}
        {/* Aturan 2 & 4: flex-col, sm:flex-row. curved header spec: bg-[#7A8C5C] rounded-b-[40px] */}
        <header className="h-auto md:h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 lg:p-10 bg-[#7A8C5C] rounded-b-[40px] gap-4 sm:gap-0 sticky top-0 md:relative z-20 shadow-md">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Bot Avatar Variant: White with olive K */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FAF7F2] shrink-0 rounded-full flex items-center justify-center text-[#7A8C5C] font-extrabold text-xl sm:text-2xl shadow-inner border border-[#D6CFC4]">
              P
            </div>
            <div className="flex-1">
              {/* Aturan 3: Heading text, variants: white/cream */}
              <h2 className="font-extrabold text-xl sm:text-2xl text-[#FAF7F2]">Profesor Cerdas</h2>
              {/* Aturan 3: Body text, variants: cozy cream white */}
              <p className="text-xs sm:text-sm text-[#FAF7F2] font-semibold">Siap jawab pertanyaan kamu!</p>
            </div>
          </div>
          {/* Aturan 9: No harsh borders. Soft shadows. Use organic shapes. */}
          <div className="flex items-center w-full sm:w-auto bg-[#FAF7F2] rounded-xl px-1 py-1 border border-[#D6CFC4] shadow-inner">
            <span className="text-[11px] font-semibold text-[#6B5C4E] px-3">Topik saat ini:</span>
            <select className="w-full sm:w-auto text-xs sm:text-sm font-semibold border-none rounded-lg px-3 py-1 bg-transparent text-[#2C1A0E] outline-none focus:ring-1 focus:ring-[#7A8C5C]">
              <option>Tumbuhan dan fotosintesis</option>
            </select>
          </div>
        </header>

        {/* Chat Messages */}
        {/* Aturan 4: Spacing Responsive. Spacing lebih cozy. Spacing bubbles. Spacing. Spacing. */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 flex flex-col gap-6 sm:gap-8 lg:gap-10 bg-[#F5F0E8]">
          
          {/* Bubble Pertanyaan User */}
          <div className="flex flex-col items-end w-full">
            {/* User bubble: Primary dark brown variant, soft cream white text */}
            <div className="bg-[#2C1A0E] text-[#FAF7F2] px-5 sm:px-6 py-3.5rounded-3xl rounded-tr-xl max-w-[85%] sm:max-w-xl shadow-xl border border-[#FAF7F2]/5">
              <p className="text-sm sm:text-base leading-relaxed">Apa fungsi utama jantung dalam tubuh manusia?</p>
            </div>
          </div>

          {/* Bubble Jawaban Bot */}
          {/* Bot bubble spec: Card/Container: bg-[#FAF7F2] rounded-3xl shadow-sm */}
          <div className="flex gap-4 sm:gap-6 max-w-full sm:max-w-3xl items-start">
            {/* Avatar K variant: Olive background, white K */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#7A8C5C] shrink-0 rounded-full flex items-center justify-center text-[#FAF7F2] font-extrabold text-xl sm:text-2xl mt-1 shadow-md border border-[#D6CFC4]">
              K
            </div>
            <div className="flex flex-col gap-3 w-full">
              {/* Chat bubble body text color: dark brown #2C1A0E */}
              <div className="bg-[#FAF7F2] border border-[#D6CFC4] px-5 sm:px-6 py-4 rounded-3xl rounded-tl-xl shadow-md">
                <p className="text-sm sm:text-base leading-relaxed text-[#2C1A0E]">
                  Jantung berfungsi memompa darah ke seluruh tubuh agar oksigen dan nutrisi tersebar merata ke semua organ.
                </p>
              </div>
              
              {/* Tombol Feedback */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 ml-1 mt-1">
                <span className="text-[11px] sm:text-xs text-[#6B5C4E] font-medium mr-2 hidden sm:block">Jawaban ini:</span>
                <div className="flex gap-2">
                  <button className="text-xs sm:text-sm font-semibold px-4 py-2 border border-[#D6CFC4] rounded-full text-[#2C1A0E] bg-white hover:bg-[#FAF7F2] hover:border-[#7A8C5C] transition-all flex-1 sm:flex-none shadow-sm">
                    👍 Mudah dipahami
                  </button>
                  <button className="text-xs sm:text-sm font-semibold px-4 py-2 border border-[#D6CFC4] rounded-full text-[#2C1A0E] bg-white hover:bg-[#FDE8DC] hover:border-[#C4621D] transition-all flex-1 sm:flex-none shadow-sm">
                    👎 Kurang jelas
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Chat Input Area */}
        {/* Aturan 4: Padding */}
        <div className="p-6 border-t border-[#D6CFC4] bg-white rounded-t-[40px]">
          {/* Aturan 2: max-w-7xl mx-auto container */}
          <div className="w-full max-w-7xl mx-auto flex items-center gap-3 sm:gap-4">
            <button className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-[#F5F0E8] border border-[#D6CFC4] flex items-center justify-center text-[#6B5C4E] hover:bg-[#FAF7F2] hover:text-[#2C1A0E] transition-colors shadow-sm">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className="flex-1 bg-[#F5F0E8] rounded-full flex items-center px-5 py-3.5 border border-transparent focus-within:border-[#7A8C5C] focus-within:ring-2 focus-within:ring-[#7A8C5C]/30 focus-within:bg-white transition-all shadow-inner">
              <input 
                type="text" 
                placeholder="Tanya Profesor Cerdas di sini..." 
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-[#2C1A0E] placeholder-[#6B5C4E] font-medium"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

        {isQuizOpen && (
        <QuizFlow onClose={() => setIsQuizOpen(false)} />
      )}
      
    </div>
  );
};

export default App;