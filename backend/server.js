import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import Routes
import authRoutes from './routes/auth.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Gunakan Route
app.use('/api/auth', authRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('API Kak Pintar (ES Modules) is Running...');
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server Backend jalan di port ${PORT}`);
  });
}

// WAJIB: Ekspor app agar Vercel bisa membaca konfigurasi rutenya
export default app;