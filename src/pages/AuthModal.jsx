import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    nama_lengkap: '',
    username: '',
    password: '',
    role: 'anak', // default role
    parent_id: '',
    agreed: false,
  });

  useEffect(() => {
    setErrorMessage('');
    setSuccessMessage('');
    setFormData({ nama_lengkap: '', username: '', password: '', role: 'anak', parent_id: '', agreed: false });
  }, [activeTab]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // AKSI: Masuk sebagai Guest (Tamu) tanpa membuat akun database
  const handleGuestLogin = () => {
    localStorage.setItem('app_mode_guest', 'true');
    localStorage.removeItem('student_token'); // Bersihkan token lama jika ada
    if (onClose) onClose();
    window.location.reload(); // Refresh aman agar App.jsx mendeteksi status Guest global
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (activeTab === 'register') {
        if (!formData.agreed) {
          setErrorMessage('Kamu harus menyetujui syarat & ketentuan terlebih dahulu.');
          return;
        }

        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: formData.username,
          password: formData.password,
          role: formData.role,
          parent_id: formData.role === 'anak' && formData.parent_id ? formData.parent_id : null,
          nama_lengkap: formData.nama_lengkap
        });

        setSuccessMessage(response.data.message || 'Registrasi berhasil!');
        setTimeout(() => setActiveTab('login'), 2000);

      } else {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username: formData.username,
          password: formData.password
        });

        // Menyimpan paket data sesi lengkap relasi TiDB Cloud
        localStorage.setItem('student_token', response.data.token);
        localStorage.setItem('student_id', response.data.user.id);
        localStorage.setItem('student_name', response.data.user.nama_lengkap);
        localStorage.setItem('student_role', response.data.user.role);
        localStorage.removeItem('app_mode_guest'); // Matikan status guest karena sudah login resmi

        setSuccessMessage('Login sukses!');
        setTimeout(() => {
          if (onClose) onClose();
          window.location.reload(); // Refresh aman agar App.jsx menangkap status session baru
        }, 1000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Terjadi gangguan jaringan.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#2C1A0E]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-['Nunito']">
      <div className="bg-[#FAF7F2] rounded-[40px] sm:rounded-[50px] w-full max-w-md p-6 sm:p-8 lg:p-10 shadow-xl border border-[#D6CFC4]" onClick={(e) => e.stopPropagation()}>
        
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#D6CFC4] bg-[#F5F0E8] p-4 rounded-[30px]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#7A8C5C] rounded-full flex items-center justify-center text-[#FAF7F2] font-black text-2xl border-2 border-white">K</div>
            <h2 className="font-extrabold text-2xl text-[#2C1A0E]">Kak Pintar</h2>
          </div>
          <button onClick={onClose} className="text-[#6B5C4E] hover:text-[#C4621D] p-2 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Tab Navigasi */}
        <div className="flex bg-[#F5F0E8] rounded-full p-1.5 mb-6 border-2 border-[#D6CFC4]">
          <button type="button" onClick={() => setActiveTab('login')} className={`flex-1 text-center py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'login' ? 'bg-[#7A8C5C] text-[#FAF7F2] shadow-md' : 'text-[#6B5C4E]'}`}>Masuk</button>
          <button type="button" onClick={() => setActiveTab('register')} className={`flex-1 text-center py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'register' ? 'bg-[#7A8C5C] text-[#FAF7F2] shadow-md' : 'text-[#6B5C4E]'}`}>Daftar</button>
        </div>

        {errorMessage && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl text-center font-bold">⚠️ {errorMessage}</div>}
        {successMessage && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl text-center font-bold">🎉 {successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'register' && (
            <>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#2C1A0E]">Nama lengkap</label>
                <input type="text" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} placeholder="Nama lengkap kamu..." className="w-full px-4 py-2.5 border border-[#D6CFC4] bg-white text-sm rounded-xl outline-none font-medium text-[#2C1A0E]" required />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#2C1A0E]">Peran Akun</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2.5 border border-[#D6CFC4] rounded-xl bg-white text-sm font-bold text-[#2C1A0E] outline-none">
                  <option value="anak">Anak (Siswa Sekolah Dasar)</option>
                  <option value="orangtua">Orang Tua (Wali Murid)</option>
                </select>
              </div>

              {formData.role === 'anak' && (
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#2C1A0E]">ID Hubung Orang Tua (Opsional)</label>
                  <input type="number" name="parent_id" value={formData.parent_id} onChange={handleChange} placeholder="Masukkan ID user orang tua jika ada..." className="w-full px-4 py-2.5 border border-[#D6CFC4] bg-white text-sm rounded-xl outline-none font-medium text-[#2C1A0E]" />
                </div>
              )}
            </>
          )}

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#2C1A0E]">Username / Email</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Masukkan nama pengguna..." className="w-full px-4 py-2.5 border border-[#D6CFC4] bg-white text-sm rounded-xl outline-none font-medium text-[#2C1A0E]" required />
          </div>

          <div className="space-y-1 relative">
            <label className="text-sm font-semibold text-[#2C1A0E]">Kata sandi</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-4 py-2.5 pr-11 border border-[#D6CFC4] bg-white text-sm rounded-xl outline-none font-medium text-[#2C1A0E]" required />
              
              {/* PERBAIKAN: Menggunakan Penunjuk Ikon Mata Mata Kustom Minimalis Standar UI */}
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B5C4E] hover:text-[#7A8C5C] transition-colors p-1"
                title={showPassword ? "Sembunyikan Kata Sandi" : "Tampilkan Kata Sandi"}
              >
                {showPassword ? (
                  // Ikon Mata Terbuka
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  // Ikon Mata Tertutup / Coret
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.822 7.822L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {activeTab === 'register' && (
            <div className="flex items-start gap-2 pt-1">
              <input type="checkbox" id="agreed" name="agreed" checked={formData.agreed} onChange={handleChange} className="w-4 h-4 mt-0.5 accent-[#7A8C5C]" />
              <label htmlFor="agreed" className="text-xs text-[#6B5C4E] leading-relaxed">Saya menyetujui semua aturan pengerjaan platform Kak Pintar.</label>
            </div>
          )}

          {/* Tombol Utama Submit Form */}
          <button type="submit" className="w-full bg-[#2C1A0E] text-[#FAF7F2] font-bold py-3 rounded-full mt-2 hover:bg-[#3B2314] transition-all shadow-md text-sm">
            {activeTab === 'login' ? 'Masuk' : 'Buat akun'}
          </button>
        </form>

        {/* Garis Pembatas Aturan Desain */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-0.5 bg-[#D6CFC4]/60 rounded-full"></div>
          <span className="text-[10px] text-[#6B5C4E] font-bold uppercase tracking-wider">Atau</span>
          <div className="flex-1 h-0.5 bg-[#D6CFC4]/60 rounded-full"></div>
        </div>

        {/* INTEGRASI TAMBAHAN: Tombol Jalan Pintas Menjadi Guest (Tamu) */}
        <button 
          type="button" 
          onClick={handleGuestLogin}
          className="w-full bg-white border-2 border-[#D6CFC4] text-[#6B5C4E] font-bold py-2.5 rounded-full shadow-sm hover:border-[#7A8C5C] hover:text-[#7A8C5C] transition-all text-sm"
        >
          🚀 Masuk Sebagai Guest (Tamu)
        </button>

      </div>
    </div>
  );
};

export default AuthModal;