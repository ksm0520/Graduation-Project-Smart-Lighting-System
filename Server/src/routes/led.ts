import express from 'express';
import pool from '../db';
const router = express.Router();

// 현재 LED 상태 조회
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM led_settings ORDER BY id DESC LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error('💡 LED 상태 조회 실패:', err);
    res.status(500).json({ error: 'LED 상태 조회 실패' });
  }
});

// LED 상태 변경
router.post('/', async (req, res) => {
  const { status, color, brightness } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO led_settings (status, color, brightness) VALUES ($1, $2, $3) RETURNING *',
      [status, color, brightness]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('💡 LED 설정 실패:', err);
    res.status(500).json({ error: 'LED 설정 실패' });
  }
});

export default router;
