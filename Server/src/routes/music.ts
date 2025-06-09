import express, { Request, Response } from 'express';
import pool from '../db';

const router = express.Router();

// GET /music → 음악 상태 조회
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM music ORDER BY id DESC LIMIT 1');
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('음악 상태 조회 실패:', err);
    res.status(500).json({ error: '음악 상태를 불러오는 데 실패했습니다.' });
  }
});

// POST /music → 음악 상태 변경
router.post('/', async (req: Request, res: Response) => {
  const { status, volume, mode } = req.body as {
    status: string;
    volume: number;
    mode: string;
  };

  try {
    await pool.query(
      'INSERT INTO music (status, volume, mode) VALUES ($1, $2, $3)',
      [status, volume, mode]
    );
    res.status(201).json({ message: '음악 상태가 업데이트되었습니다.' });
  } catch (err) {
    console.error('음악 상태 변경 실패:', err);
    res.status(500).json({ error: '음악 상태 변경 중 오류 발생' });
  }
});

export default router;
