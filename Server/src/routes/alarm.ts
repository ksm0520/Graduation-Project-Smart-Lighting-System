import express from 'express';
import pool from '../db';
const router = express.Router();

// 현재 알람 조회
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alarm ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('⏰ 알람 조회 실패:', err);
    res.status(500).json({ error: '알람 조회 실패' });
  }
});

// 알람 추가
router.post('/', async (req, res) => {
  const { status, time } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO alarm (status, time) VALUES ($1, $2) RETURNING *',
      [status, time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('⏰ 알람 추가 실패:', err);
    res.status(500).json({ error: '알람 추가 실패' });
  }
});

// 알람 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM alarm WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error('⏰ 알람 삭제 실패:', err);
    res.status(500).json({ error: '알람 삭제 실패' });
  }
});

export default router;
