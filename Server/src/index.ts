import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import ledRoutes from './routes/led';
import musicRoutes from './routes/music';
import alarmRoutes from './routes/alarm';
import routineRoutes from './routes/routine';
import qrRoutes from './routes/qr';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// 🔧 미들웨어
app.use(cors());
app.use(express.json());

// 🚏 라우터 등록
app.use('/led', ledRoutes);         // LED 색상/밝기/전원 제어
app.use('/music', musicRoutes);     // 음악 상태 조회 및 제어
app.use('/alarm', alarmRoutes);     // 알람 등록/조회/삭제
app.use('/routine', routineRoutes); // 루틴 추가/조회/삭제
app.use('/qr', qrRoutes);           // 루틴 QR 공유

// ✅ 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
