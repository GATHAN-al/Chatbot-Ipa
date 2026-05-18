import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

// Inisialisasi Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// REGISTER
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Validasi input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Nama, email, dan password wajib diisi." });
    }

    try {
        // 2. Daftarkan email dan password ke Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (authError) throw authError;

        const userId = authData.user?.id; 

        if (userId) {
            // 3. Masukkan data 'name' ke tabel public.profiles
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    { id: userId, name: name }
                ]);

            if (profileError) throw profileError;
        }

        res.status(201).json({ 
            message: "Registrasi berhasil!", 
            user: { id: userId, name, email } 
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // 1. Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password wajib diisi." });
    }

    try {
        // 2. Verifikasi email dan password menggunakan Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        // Jika email tidak terdaftar atau password salah, Supabase otomatis melempar error
        if (authError) {
            return res.status(400).json({ message: "Email atau password salah" });
        }

        const userId = authData.user.id;

        // 3. Ambil data 'name' dari tabel profiles berdasarkan ID yang sukses login
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', userId)
            .single();

        if (profileError) throw profileError;

        // 4. Kirim response sukses. Token JWT otomatis didapatkan dari authData.session
        res.json({
            message: "Login sukses!",
            token: authData.session.access_token, // JWT Token otomatis dari Supabase
            user: { 
                id: userId, 
                name: profileData.name, 
                email: authData.user.email 
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
});

// Export menggunakan export default
export default router;