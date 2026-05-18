// src/components/TopikPage.jsx
import React, { useState } from 'react';

const TopikPage = () => {
  const [activeTab, setActiveTab] = useState('tumbuhan');

  // Konten Rangkuman Materi Edukasi IPA SD
  const materiSains = {
    organ: { judul: "🫀 Organ Tubuh Manusia", isi: "Tubuh manusia memiliki organ dalam penting seperti jantung yang memompa darah, paru-paru untuk bernapas, dan lambung untuk mencerna makanan yang kita makan setiap hari." },
    tumbuhan: { judul: "🌱 Tumbuhan & Fotosintesis", isi: "Fotosintesis adalah cara tumbuhan memasak makanannya sendiri menggunakan bantuan klorofil (zat hijau daun), air, karbondioksida, dan cahaya matahari untuk menghasilkan oksigen." },
    ekosistem: { judul: "🐾 Hewan & Ekosistem", isi: "Ekosistem adalah tempat hubungan timbal balik antara makhluk hidup dengan lingkungannya. Terdiri dari produsen (tumbuhan), konsumen (hewan), dan pengurai (jamur/bakteri)." },
    benda: { judul: "📦 Benda & Sifatnya", isi: "Benda di sekitar kita dikelompokkan menjadi tiga wujud utama, yaitu benda padat (bentuk tetap), benda cair (mengalir mengikuti wadah), dan benda gas (mengisi seluruh ruangan)." },
    gaya: { judul: "⚡ Gaya & Gerak", isi: "Gaya adalah tarikan atau dorongan yang dapat menyebabkan benda bergerak, berubah arah, atau berubah bentuk. Contohnya gaya gravitasi yang menarik benda jatuh ke bawah." },
    cahaya: { judul: "🔦 Cahaya & Optik", isi: "Cahaya memiliki sifat dapat merambat lurus, menembus benda bening, dapat dipantulkan, dan dapat dibiaskan ketika melewati dua medium zat yang berbeda kerapatannya." },
    tatasurya: { judul: "🪐 Sistem Tata Surya", isi: "Tata surya adalah susunan matahari sebagai pusat yang dikelilingi oleh 8 planet utama, termasuk Bumi tempat kita tinggal, serta benda langit lainnya seperti asteroid dan meteor." },
    lingkungan: { judul: "🪵 Daur Air & Lingkungan", isi: "Air di bumi mengalami perputaran terus-menerus melalui proses penguapan (evaporasi), pembentukan awan (kondensasi), dan turunnya hujan (presipitasi) secara berulang." }
  };

  return (
    <div className="flex-1 bg-[#F5F0E8] overflow-y-auto font-['Nunito'] text-[#2C1A0E] p-6 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl sm:text-3xl font-black">📚 Ensiklopedia Topik IPA</h1>
          <p className="text-xs sm:text-sm text-[#6B5C4E] mt-1">Pilih salah satu materi di bawah ini untuk membaca rangkuman ilmu pengetahuan alam yang seru!</p>
        </header>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Menu Pilihan Samping */}
          <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible shrink-0 pb-2 md:pb-0">
            {Object.keys(materiSains).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-3 rounded-xl font-bold text-xs text-left whitespace-nowrap transition-all border ${activeTab === key ? 'bg-[#7A8C5C] text-[#FAF7F2] border-[#7A8C5C] shadow-sm' : 'bg-[#FAF7F2] text-[#6B5C4E] border-[#D6CFC4] hover:bg-white'}`}
              >
                {materiSains[key].judul}
              </button>
            ))}
          </div>

          {/* Box Display Teks Bacaan */}
          <div className="flex-1 bg-[#FAF7F2] border border-[#D6CFC4] p-6 rounded-[32px] shadow-sm space-y-3 min-h-[300px]">
            <span className="inline-block bg-[#F5F0E8] text-[#C4621D] text-[10px] font-black px-3 py-1 rounded-md border border-[#D6CFC4]">
              Materi Pembelajaran Kelas 5 SD
            </span>
            <h2 className="text-xl font-black text-[#2C1A0E]">{materiSains[activeTab].judul}</h2>
            <div className="w-full h-0.5 bg-[#D6CFC4]/40 my-2"></div>
            <p className="text-sm sm:text-base text-[#6B5C4E] leading-relaxed font-medium">
              {materiSains[activeTab].isi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopikPage;