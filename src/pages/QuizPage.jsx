import React, { useState } from 'react';

const QuizPage = () => {
  // State untuk melacak apakah siswa sudah memilih topik kuis
  // Nilai null artinya sedang berada di halaman pemilihan topik
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // State untuk jalannya kuis
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Bank Data Soal Berdasarkan Skema Target Topik Database TiDB
  const quizDatabase = {
    tumbuhan: [
      { id: 1, question: "Apakah fungsi utama klorofil pada daun tumbuhan hijau?", options: ["Menyerap air", "Menangkap cahaya matahari", "Menyimpan cadangan makanan", "Menggugurkan daun"], correct: "Menangkap cahaya matahari" },
      { id: 2, question: "Gas apa yang dilepaskan oleh tumbuhan ke udara setelah proses fotosintesis?", options: ["Karbon dioksida", "Oksigen", "Nitrogen", "Uap air"], correct: "Oksigen" }
    ],
    energi: [
      { id: 1, question: "Planet manakah yang dikenal sebagai \"Planet Merah\" dalam sistem tata surya kita?", options: ["Merkurius", "Venus", "Mars", "Jupiter"], correct: "Mars" },
      { id: 2, question: "Pusat dari tata surya kita yang memancarkan energi cahaya sendiri adalah...", options: ["Bumi", "Bulan", "Meteor", "Matahari"], correct: "Matahari" }
    ],
    lingkungan: [
      { id: 1, question: "Manakah di bawah ini yang merupakan tindakan pelestarian lingkungan hidup?", options: ["Penebangan liar", "Membuang sampah ke sungai", "Penanaman pohon kembali (Reboisasi)", "Membakar hutan"], correct: "Penanaman pohon kembali (Reboisasi)" },
      { id: 2, question: "Sampah plastik termasuk ke dalam kategori kelompok sampah apa?", options: ["Anorganik (Sulit hancur)", "Organik (Mudah membusuk)", "B3 (Berbahaya)", "Cair"], correct: "Anorganik (Sulit hancur)" }
    ]
  };

  const handleStartQuiz = (topicKey) => {
    setSelectedTopic(topicKey);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsFinished(false);
    setScore(0);
  };

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    const currentQuestions = quizDatabase[selectedTopic];
    if (selectedAnswer === currentQuestions[currentQuestionIndex].correct) {
      setScore(score + 100 / currentQuestions.length);
    }

    if (currentQuestionIndex + 1 < currentQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
    }
  };

  // ====================================================================
  // ALUR 1: HALAMAN PEMILIHAN TOPIK (KONDISI AWAL)
  // ====================================================================
  if (!selectedTopic) {
    return (
      <div className="flex-1 p-6 sm:p-10 overflow-y-auto bg-[#F5F0E8]">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-black text-[#2C1A0E] mb-2">Papan Misi Kuis Sains 🎯</h1>
            <p className="text-[#6B5C4E] text-sm sm:text-base">Pilih satu topik materi IPA di bawah ini yang ingin kamu taklukkan hari ini!</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kartu Topik 1 */}
            <div className="bg-[#FAF7F2] border border-[#D6CFC4] p-6 rounded-[32px] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <span className="text-4xl">🌱</span>
                <h3 className="font-extrabold text-xl text-[#2C1A0E] mt-3 mb-2">Tumbuhan Hijau</h3>
                <p className="text-xs text-[#6B5C4E] leading-relaxed mb-6">Uji pengetahuanmu seputar fotosintesis, fungsi daun, dan cara tumbuhan memasak makanannya sendiri.</p>
              </div>
              <button onClick={() => handleStartQuiz('tumbuhan')} className="w-full bg-[#7A8C5C] text-white font-bold py-2.5 rounded-full text-xs shadow-sm hover:bg-[#68784c]">
                Mulai Kuis
              </button>
            </div>

            {/* Kartu Topik 2 */}
            <div className="bg-[#FAF7F2] border border-[#D6CFC4] p-6 rounded-[32px] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <span className="text-4xl">☀️</span>
                <h3 className="font-extrabold text-xl text-[#2C1A0E] mt-3 mb-2">Sistem Energi & Surya</h3>
                <p className="text-xs text-[#6B5C4E] leading-relaxed mb-6">Jelajahi rahasia planet-planet, tata surya, energi matahari, serta pemanfaatan energi alternatif di bumi.</p>
              </div>
              <button onClick={() => handleStartQuiz('energi')} className="w-full bg-[#7A8C5C] text-white font-bold py-2.5 rounded-full text-xs shadow-sm hover:bg-[#68784c]">
                Mulai Kuis
              </button>
            </div>

            {/* Kartu Topik 3 */}
            <div className="bg-[#FAF7F2] border border-[#D6CFC4] p-6 rounded-[32px] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <span className="text-4xl">🌍</span>
                <h3 className="font-extrabold text-xl text-[#2C1A0E] mt-3 mb-2">Lingkungan Hidup</h3>
                <p className="text-xs text-[#6B5C4E] leading-relaxed mb-6">Belajar cara menjaga bumi, mengenal jenis sampah anorganik, serta pentingnya reboisasi lingkungan hutan.</p>
              </div>
              <button onClick={() => handleStartQuiz('lingkungan')} className="w-full bg-[#7A8C5C] text-white font-bold py-2.5 rounded-full text-xs shadow-sm hover:bg-[#68784c]">
                Mulai Kuis
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================================
  // ALUR 2: HALAMAN SKOR SETELAH KUIS SELESAI
  // ====================================================================
  if (isFinished) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#F5F0E8] p-6">
        <div className="bg-[#FAF7F2] border border-[#D6CFC4] p-8 rounded-[40px] text-center max-w-sm shadow-xl">
          <span className="text-5xl">🏆</span>
          <h2 className="text-2xl font-black text-[#2C1A0E] mt-4">Misi Selesai!</h2>
          <p className="text-[#6B5C4E] text-sm mt-2">Selamat! Nilai akumulasi kuis kamu untuk topik <span className="font-bold uppercase text-[#7A8C5C]">{selectedTopic}</span> adalah:</p>
          <div className="text-5xl font-black text-[#7A8C5C] my-5">{Math.round(score)}</div>
          <div className="flex gap-2">
            <button onClick={() => setSelectedTopic(null)} className="flex-1 bg-[#D6CFC4] text-[#2C1A0E] font-bold px-4 py-2.5 rounded-full text-xs">Papan Misi</button>
            <button onClick={() => handleStartQuiz(selectedTopic)} className="flex-1 bg-[#2C1A0E] text-[#FAF7F2] font-bold px-4 py-2.5 rounded-full text-xs">Ulangi Kuis</button>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================================
  // ALUR 3: HALAMAN LEMBAR KERJA SOAL JALANNYA KUIS
  // ====================================================================
  const currentQuestions = quizDatabase[selectedTopic];
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

  // Formatting judul nama topik untuk tag atas
  const topicTitles = { tumbuhan: "🌱 Tumbuhan Hijau", energi: "☀️ Sistem Tata Surya", lingkungan: "🌍 Lingkungan Hidup" };

  return (
    <div className="flex-1 p-4 sm:p-8 bg-[#F5F0E8] overflow-y-auto flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl border border-[#D6CFC4] shadow-md p-6 space-y-6">
        
        {/* Top Badges Info */}
        <div className="flex justify-between items-center">
          <div className="bg-[#C4621D]/10 text-[#C4621D] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
            {topicTitles[selectedTopic]}
          </div>
          <div className="bg-sky-50 text-sky-700 font-bold px-3 py-1 rounded-xl text-xs flex items-center gap-1">⏱️ 00:45</div>
        </div>

        {/* Progress Bar Label */}
        <div className="flex justify-between text-xs font-bold text-[#6B5C4E]">
          <span>Soal {currentQuestionIndex + 1} dari {currentQuestions.length}</span>
          <span>{Math.round(progressPercent)}% selesai</span>
        </div>

        {/* Progress Line Bar */}
        <div className="w-full h-2.5 bg-[#EAE3D5] rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-sky-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* Card Konten Soal */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-[32px] p-6 text-center shadow-inner">
          <span className="text-[10px] font-bold uppercase text-sky-600 tracking-wider">Pertanyaan {currentQuestionIndex + 1}</span>
          <h2 className="text-base sm:text-lg font-extrabold text-[#2C1A0E] mt-1.5 leading-relaxed">{currentQuestion.question}</h2>
        </div>

        {/* Opsi Pilihan Ganda */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              className={`p-3.5 rounded-xl font-bold text-xs sm:text-sm text-center border transition-all ${selectedAnswer === option ? 'bg-[#7A8C5C] border-[#7A8C5C] text-white ring-4 ring-[#7A8C5C]/10' : 'bg-[#FAF7F2] border-[#D6CFC4] text-[#2C1A0E] hover:bg-white'}`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Footer Aksi */}
        <div className="flex justify-between items-center pt-4 border-t border-[#D6CFC4]/60">
          <button onClick={() => setSelectedTopic(null)} className="text-xs font-bold text-[#6B5C4E] bg-slate-100 px-4 py-2 rounded-xl">Batalkan Kuis</button>
          <button
            disabled={!selectedAnswer}
            onClick={handleNext}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl shadow-sm transition-all ${selectedAnswer ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            {currentQuestionIndex + 1 === currentQuestions.length ? 'Selesaikan Misi 🏁' : 'Soal Berikutnya →'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default QuizPage;