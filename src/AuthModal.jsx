import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: activeTab === 'login' ? 'budi@email.com' : '',
    password: '',
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (!isOpen) return null;

  return (
    // Aturan 8: overflow-x-hidden
    // Aturan 4: Spacing responsif overlay container p-4, sm:p-6. Overlay: Dark Brown variant variant variant.
    <div className="fixed inset-0 bg-[#2C1A0E]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* Container Modal */}
      {/* Diperbaiki: Modal container menggunakan curved header baru dan palet warna spec */}
      {/* Aturan 4: Spacing responsif modal p-6, sm:p-8, lg:p-10. Soft shadow. rounded-3xl. border: creamygrey #D6CFC4 */}
      <div 
        className="bg-[#FAF7F2] rounded-[40px] sm:rounded-[50px] w-full max-w-lg p-6 sm:p-8 lg:p-10 shadow-[0_15px_60px_-15px_rgba(44,26,14,0.15)] relative transition-transform transform duration-300 scale-100 my-auto border border-[#D6CFC4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Styled as organic shape, part of curved olive design */}
        {/* Avatar variant: White K with olive background */}
        <div className="flex items-center justify-between mb-8 sm:mb-10 pb-5 sm:pb-6 border-b-2 border-[#D6CFC4] bg-[#F5F0E8] p-5 rounded-[30px]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#7A8C5C] rounded-full flex items-center justify-center text-[#FAF7F2] font-extrabold text-2xl sm:text-3xl shrink-0 shadow-lg border-2 border-white">
              K
            </div>
            {/* Aturan 3: Heading typography, warm brown */}
            <h2 className="font-extrabold text-2xl sm:text-3xl text-[#2C1A0E]">Kak Pintar</h2>
          </div>
          {/* Close Button accent: Warm Orange hover variant */}
          <button onClick={onClose} className="text-[#6B5C4E] hover:text-[#C4621D] hover:bg-[#FDE8DC] transition-colors p-2.5 rounded-full hover:shadow-inner focus:outline-none focus:ring-2 focus:ring-[#7A8C5C]">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Tab Navigasi: Styled with Earthy colors */}
        <div className="flex bg-[#F5F0E8] rounded-full p-2 mb-8 sm:mb-10 border-2 border-[#D6CFC4] shadow-inner">
          {/* Active Link variant: Olive with cream white text */}
          <button 
            onClick={() => setActiveTab('login')}
            className={`flex-1 text-center py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all ${activeTab === 'login' ? 'bg-[#7A8C5C] text-[#FAF7F2] shadow-xl' : 'text-[#6B5C4E] hover:text-[#2C1A0E] hover:font-bold'}`}
          >
            Masuk
          </button>
          <button 
            onClick={() => setActiveTab('register')}
            className={`flex-1 text-center py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all ${activeTab === 'register' ? 'bg-[#7A8C5C] text-[#FAF7F2] shadow-xl' : 'text-[#6B5C4E] hover:text-[#2C1A0E] hover:font-bold'}`}
          >
            Daftar
          </button>
        </div>

        {/* Konten Form */}
        {/* Aturan 4: Spacing form. Typography body/label: medium-weight text-[#2C1A0E] text-sm */}
        <form className="space-y-5 sm:space-y-6">
          {activeTab === 'register' && (
            <div className="space-y-1.5">
              {/* Aturan 3: Typography label, warm brown */}
              <label htmlFor="name" className="text-sm font-semibold text-[#2C1A0E]">Nama lengkap</label>
              {/* Aturan 9: No harsh borders. Soft shadows. rounded-xl. spec inputs: border border-[#D6CFC4] bg-white px-4 py-3 */}
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Masukkan nama kamu..." 
                className="w-full px-5 py-3 sm:py-3.5 border border-[#D6CFC4] rounded-xl bg-white text-sm sm:text-base text-[#2C1A0E] placeholder-[#6B5C4E] focus:border-[#7A8C5C] focus:ring-1 focus:ring-[#7A8C5C] outline-none transition-all font-medium"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-[#2C1A0E]">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Masukkan email kamu..." 
              className="w-full px-5 py-3 sm:py-3.5 border border-[#D6CFC4] rounded-xl bg-white text-sm sm:text-base text-[#2C1A0E] placeholder-[#6B5C4E] focus:border-[#7A8C5C] focus:ring-1 focus:ring-[#7A8C5C] outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-1.5 relative">
            <label htmlFor="password" className="text-sm font-semibold text-[#2C1A0E]">Kata sandi</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder={activeTab === 'login' ? '••••••••' : 'Buat kata sandi...'} 
                className="w-full px-5 py-3 sm:py-3.5 pr-12 sm:pr-14 border border-[#D6CFC4] rounded-xl bg-white text-sm sm:text-base text-[#2C1A0E] placeholder-[#6B5C4E] focus:border-[#7A8C5C] focus:ring-1 focus:ring-[#7A8C5C] outline-none transition-all font-medium"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-[#6B5C4E] hover:text-[#C4621D] hover:bg-[#FDE8DC] transition-colors p-1 rounded-full hover:shadow-inner"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </button>
            </div>
            {activeTab === 'login' && (
              <div className="text-right pt-1.5">
                {/* Accent link variant: Warm Orange variant C4621D */}
                <a href="#" className="text-xs font-semibold text-[#C4621D] hover:text-[#D4702A] hover:underline">Lupa kata sandi?</a>
              </div>
            )}
          </div>

          {activeTab === 'register' && (
            <div className="flex items-start gap-2.5 pt-1.5 mb-2">
              <input 
                type="checkbox" 
                id="agreed" 
                name="agreed" 
                checked={formData.agreed} 
                onChange={handleChange} 
                className="w-4 h-4 sm:w-5 h-5 mt-1 rounded-lg border-2 border-[#D6CFC4] text-[#7A8C5C] focus:ring-[#7A8C5C] accent-[#7A8C5C] transition-all cursor-pointer shadow-inner"
              />
              <label htmlFor="agreed" className="text-xs sm:text-sm text-[#6B5C4E] leading-relaxed">
                Saya setuju dengan <a href="#" className="font-semibold text-[#C4621D] hover:text-[#D4702A] hover:underline">syarat & ketentuan</a> yang berlaku
              </label>
            </div>
          )}

          <div className="pt-4 sm:pt-6">
            {/* CTA Button Primary Spec: Primary Button: bg-[#2C1A0E] text-white rounded-full py-3 px-6 font-semibold */}
            <button 
              type="submit" 
              className="w-full bg-[#2C1A0E] text-[#FAF7F2] font-bold text-sm sm:text-base py-4 sm:py-4.5 rounded-full hover:bg-[#3B2314] transition-all shadow-lg focus:ring-4 focus:ring-[#7A8C5C]"
            >
              {activeTab === 'login' ? 'Masuk' : 'Buat akun'}
            </button>
          </div>
        </form>
        
        {/* Garis Pemisah "atau" */}
        <div className="flex items-center gap-4 my-8 sm:my-10">
          <div className="flex-1 h-0.5 bg-[#D6CFC4] rounded-full"></div>
          <span className="text-[10px] sm:text-xs text-[#6B5C4E] font-medium uppercase tracking-widest bg-[#FAF7F2] px-2">atau</span>
          <div className="flex-1 h-0.5 bg-[#D6CFC4] rounded-full"></div>
        </div>

        {/* Tombol Login/Daftar dengan Google */}
        {/* Aturan 9: No harsh borders. soft shadows. */}
        {/* Social buttons spec: rounded-full border border-[#D6CFC4] bg-white */}
        <div className="mb-10">
          <button className="w-full bg-white border border-[#D6CFC4] text-[#2C1A0E] font-semibold text-xs sm:text-sm py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2 sm:gap-3 hover:bg-[#FAF7F2] hover:border-[#7A8C5C] hover:text-[#7A8C5C] hover:border hover:p-3 border p-3 transition-all shadow-md focus:ring-2 focus:ring-[#FAF7F2]">
            <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google Logo" className="w-4 h-4 sm:w-5 h-5" />
            {activeTab === 'login' ? 'Masuk dengan Google' : 'Daftar dengan Google'}
          </button>
        </div>

        {/* Footer: styled cozy text. link: warm orange variant C4621D */}
        <div className="text-center text-xs sm:text-sm border-t border-[#D6CFC4] pt-8 bg-[#FDE8DC]/50 p-6 rounded-[20px]">
          <p className="text-[#6B5C4E]">
            {activeTab === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}
            {' '}
            <button 
              onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
              className="font-bold text-[#C4621D] hover:text-[#D4702A] hover:underline"
            >
              {activeTab === 'login' ? 'Daftar sekarang' : 'Masuk di sini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;