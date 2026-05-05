import React, { useState } from 'react';

// Data Mockup Kuis Sains
const quizQuestions = [
  {
    id: 1,
    question: "Apa fungsi utama daun pada proses fotosintesis?",
    options: [
      "Menyerap air dari tanah",
      "Menyerap cahaya matahari dan karbon dioksida",
      "Menyimpan cadangan makanan",
      "Melindungi bunga dari hama"
    ]
  },
  {
    id: 2,
    question: "Zat hijau daun yang berperan penting menangkap cahaya matahari disebut?",
    options: [
      "Klorofil",
      "Stomata",
      "Kambium",
      "Xilem"
    ]
  },
  {
    id: 3,
    question: "Gas apa yang dilepaskan oleh tumbuhan sebagai hasil fotosintesis?",
    options: [
      "Karbon dioksida",
      "Nitrogen",
      "Oksigen",
      "Hidrogen"
    ]
  }
];

const Quiz = ({ onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleSelectOption = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: option
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Kuis Selesai! Mengirim jawaban...");
      // Tambahkan logika submit kuis di sini nantinya
      if (onClose) onClose();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isCurrentQuestionAnswered = !!selectedAnswers[currentQuestion.id];

  return (
    // Memastikan font Nunito dan background utama sesuai sistem desain
    <div className="min-h-screen bg-[#F5F0E8] font-['Nunito'] flex flex-col items-center justify-center p-4 sm:p-6">
      
      {/* Container Card Kuis: Sesuai aturan komponen (bg Cream, rounded-3xl, shadow) */}
      <div className="w-full max-w-lg bg-[#FAF7F2] rounded-[40px] shadow-sm border border-[#D6CFC4] overflow-hidden flex flex-col min-h-[600px] relative">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#D6CFC4]/50">
          <button 
            onClick={onClose} // Atau handlePrev jika ingin tombol back di atas
            className="text-[#6B5C4E] hover:text-[#2C1A0E] hover:bg-[#D6CFC4]/30 p-2 rounded-full transition-colors focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <span className="font-bold text-[#2C1A0E] text-sm tracking-wide">
            Kuis Topik IPA
          </span>
          <button 
            onClick={onClose}
            className="text-[#6B5C4E] hover:text-[#C4621D] hover:bg-[#FDE8DC]/50 p-2 rounded-full transition-colors focus:outline-none"
          >
            <span className="text-xs font-bold uppercase tracking-wider">Batal</span>
          </button>
        </div>

        {/* Progress Bar & Indikator */}
        <div className="px-8 pt-8">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[#7A8C5C] font-extrabold text-3xl">
              {currentQuestionIndex + 1}
              <span className="text-lg text-[#D6CFC4]">/{quizQuestions.length}</span>
            </span>
          </div>
          {/* Progress Bar Base */}
          <div className="w-full bg-[#D6CFC4]/40 rounded-full h-2.5 overflow-hidden">
            {/* Progress Bar Fill (Olive Green) */}
            <div 
              className="bg-[#7A8C5C] h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Area Pertanyaan */}
        <div className="px-8 py-8 flex-1 flex flex-col">
          <h2 className="font-bold text-2xl text-[#2C1A0E] leading-snug mb-8">
            {currentQuestion.question}
          </h2>

          {/* Opsi Jawaban */}
          <div className="flex flex-col gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion.id] === option;
              
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group outline-none
                    ${isSelected 
                      ? 'border-[#7A8C5C] bg-[#7A8C5C]/10 ring-2 ring-[#7A8C5C]/20 shadow-sm' // State Aktif: Olive Green border & soft bg
                      : 'border-[#D6CFC4] bg-white hover:border-[#7A8C5C]/50 hover:bg-[#FAF7F2]' // State Default
                    }
                  `}
                >
                  <span className={`text-base font-semibold ${isSelected ? 'text-[#2C1A0E]' : 'text-[#6B5C4E] group-hover:text-[#2C1A0E]'}`}>
                    {option}
                  </span>
                  
                  {/* Indikator Radio Button kustom (Bundar) */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                    ${isSelected ? 'border-[#7A8C5C] bg-[#7A8C5C]' : 'border-[#D6CFC4] bg-white'}
                  `}>
                    {isSelected && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-8 pb-8 pt-4 mt-auto">
          <div className="flex items-center gap-4">
            {/* Tombol Kembali (Hanya muncul jika bukan pertanyaan pertama) */}
            {currentQuestionIndex > 0 && (
              <button 
                onClick={handlePrev}
                className="w-14 h-14 shrink-0 bg-white border-2 border-[#D6CFC4] rounded-full flex items-center justify-center text-[#6B5C4E] hover:border-[#7A8C5C] hover:text-[#7A8C5C] transition-all focus:outline-none"
              >
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
              </button>
            )}

            {/* Tombol Lanjut (Primary CTA: Dark Brown) */}
            <button 
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-bold text-base transition-all
                ${isCurrentQuestionAnswered 
                  ? 'bg-[#2C1A0E] text-white hover:bg-[#3B2314] shadow-md hover:-translate-y-0.5 cursor-pointer focus:ring-4 focus:ring-[#7A8C5C]/30' 
                  : 'bg-[#D6CFC4]/50 text-[#6B5C4E]/50 cursor-not-allowed' // Disabled state
                }
              `}
            >
              {currentQuestionIndex === quizQuestions.length - 1 ? 'Selesaikan Kuis' : 'Lanjut'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Quiz;