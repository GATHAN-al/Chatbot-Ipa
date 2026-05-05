import React, { useState } from 'react';

const QuizFlow = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // --- RENDERING HALAMAN ---

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#2C1A0E] mb-2">Apa tujuan belajarmu hari ini?</h2>
            {[
              { id: 'a', label: 'Memahami Ekosistem', icon: '🌿' },
              { id: 'b', label: 'Eksperimen Fisika', icon: '⚡' },
              { id: 'c', label: 'Mengenal Tata Surya', icon: '🪐' },
              { id: 'd', label: 'Belajar Anatomi', icon: '🦴' },
            ].map((item) => (
              <button key={item.id} className="w-full flex items-center justify-between p-4 bg-white border border-[#D6CFC4] rounded-2xl hover:border-[#7A8C5C] hover:bg-[#7A8C5C]/5 transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-semibold text-[#2C1A0E]">{item.label}</span>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-[#D6CFC4] group-hover:border-[#7A8C5C]"></div>
              </button>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center gap-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#2C1A0E] text-center">Bagaimana perasaanmu tentang sains saat ini?</h2>
            <div className="flex justify-between w-full px-4 mt-8">
              {['😭', '😟', '😐', '🙂', '🤩'].map((emoji, i) => (
                <button key={i} className="flex flex-col items-center gap-2 group">
                  <span className="text-4xl grayscale group-hover:grayscale-0 transition-all hover:scale-125">{emoji}</span>
                </button>
              ))}
            </div>
            {/* Busur Skala Dekoratif (Adaptasi dari foto) */}
            <div className="w-full h-24 border-t-4 border-[#D6CFC4] rounded-[100%] mt-4 relative">
                <div className="absolute top-[-8px] left-1/2 w-4 h-4 bg-[#C4621D] rounded-full -translate-x-1/2 shadow-md"></div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center gap-8 animate-fadeIn text-center">
            <h2 className="text-2xl font-bold text-[#2C1A0E]">Seberapa sulit materi Fotosintesis bagimu?</h2>
            <div className="text-8xl font-black text-[#7A8C5C] my-4">5</div>
            <div className="flex gap-2 w-full justify-between overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <button key={num} className={`w-12 h-12 shrink-0 rounded-full font-bold transition-all border-2 ${num === 5 ? 'bg-[#C4621D] text-white border-[#C4621D]' : 'bg-white text-[#6B5C4E] border-[#D6CFC4] hover:border-[#7A8C5C]'}`}>
                  {num}
                </button>
              ))}
            </div>
            <p className="text-[#6B5C4E] font-semibold italic">"Lumayan menantang, Prof!"</p>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#2C1A0E]">Tuliskan pertanyaanmu untuk Profesor Cerdas:</h2>
            <textarea 
              placeholder="Tulis di sini..."
              className="w-full h-48 p-5 bg-white border border-[#D6CFC4] rounded-3xl outline-none focus:border-[#7A8C5C] focus:ring-1 focus:ring-[#7A8C5C] text-[#2C1A0E] font-medium resize-none shadow-inner"
            ></textarea>
            <div className="p-4 bg-[#FDE8DC] rounded-2xl flex gap-3 items-start border border-[#C4621D]/20">
               <span className="text-[#C4621D]">💡</span>
               <p className="text-xs text-[#C4621D] font-bold">Tips: Gunakan kata tanya Apa, Mengapa, atau Bagaimana agar jawaban lebih jelas.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#2C1A0E]/40 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-6 font-['Nunito']">
      {/* Container Utama: Mengikuti gaya HP di foto referensi */}
      <div className="bg-[#FAF7F2] w-full max-w-md h-full sm:h-[800px] sm:rounded-[50px] shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Curved Header Section (Sesuai Sistem Desain) */}
        <div className="bg-[#7A8C5C] pt-12 pb-10 px-8 rounded-b-[40px] flex items-center justify-between relative shadow-md">
           <button onClick={prevStep} className={`${step === 1 ? 'invisible' : 'visible'} w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white`}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
           </button>
           
           {/* Decorative Icon */}
           <div className="absolute left-1/2 -translate-x-1/2 top-4">
             <div className="w-1.5 h-6 bg-white/30 rounded-full"></div>
           </div>

           <div className="text-white font-bold text-sm tracking-widest uppercase">Assessment</div>
           
           <button onClick={onClose} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
           </button>
        </div>

        {/* Progress Bar Sederhana */}
        <div className="px-8 mt-6">
          <div className="w-full bg-[#D6CFC4]/30 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#7A8C5C] h-full transition-all duration-500" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-8 py-8 overflow-y-auto">
          {renderStep()}
        </div>

        {/* Bottom Navigation */}
        <div className="p-8 bg-[#FAF7F2]">
          <button 
            onClick={nextStep}
            className="w-full bg-[#2C1A0E] text-[#FAF7F2] font-bold py-4 rounded-full flex items-center justify-center gap-3 hover:opacity-90 shadow-xl transition-all active:scale-95"
          >
            {step === totalSteps ? 'Selesaikan' : 'Lanjut'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
          </button>
          
          {/* Footer Page Indicator */}
          <div className="flex justify-center gap-1.5 mt-6">
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${step === i + 1 ? 'w-6 bg-[#7A8C5C]' : 'w-1.5 bg-[#D6CFC4]'}`}></div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizFlow;