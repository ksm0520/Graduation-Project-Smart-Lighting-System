import express from 'express';
import db from '../db'; // pool이 아니라 db로 import

const router = express.Router();

// 🎵 음악 상태 조회 (GET /music)
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM music ORDER BY id DESC LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error('🎵 음악 상태 조회 실패:', err);
    res.status(500).json({ error: '음악 상태 조회 실패' });
  }
});

// 🎵 음악 재생 (POST /music/play)
router.post('/play', async (req, res) => {
  const { song } = req.body;
  try {
    await db.query(
      'UPDATE music SET status = $1, song = $2 WHERE id = (SELECT id FROM music ORDER BY id DESC LIMIT 1)',
      ['on', song]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('🎵 음악 재생 실패:', err);
    res.status(500).json({ error: '음악 재생 실패' });
  }
});

// 🎵 음악 정지 (POST /music/stop)
router.post('/stop', async (req, res) => {
  try {
    await db.query(
      'UPDATE music SET status = $1 WHERE id = (SELECT id FROM music ORDER BY id DESC LIMIT 1)',
      ['off']
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('🎵 음악 정지 실패:', err);
    res.status(500).json({ error: '음악 정지 실패' });
  }
});

// 🔊 볼륨 조절 (POST /music/volume)
router.post('/volume', async (req, res) => {
  const { volume } = req.body;
  try {
    await db.query(
      'UPDATE music SET volume = $1 WHERE id = (SELECT id FROM music ORDER BY id DESC LIMIT 1)',
      [volume]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('🔊 볼륨 조절 실패:', err);
    res.status(500).json({ error: '볼륨 조절 실패' });
  }
});

export default router;
