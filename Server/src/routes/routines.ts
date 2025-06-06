import express from 'express';
import { pool } from '../db';
const router = express.Router();

// 루틴 저장
router.post('/', async (req, res) => {
  const { name, time } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO routines (name, time) VALUES ($1, $2) RETURNING *',
      [name, time]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('DB 저장 오류:', err);
    res.status(500).json({ error: '저장 실패' });
  }
});

// 루틴 전체 조회
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM routines');
    res.json(result.rows);
  } catch (err) {
    console.error('DB 조회 오류:', err);
    res.status(500).json({ error: '조회 실패' });
  }
});

export default router;
