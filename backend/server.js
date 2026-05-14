import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import Routes (Wajib pakai ekstensi .js di akhir kalau pake type: module)
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Backend jalan di port ${PORT}`);
});