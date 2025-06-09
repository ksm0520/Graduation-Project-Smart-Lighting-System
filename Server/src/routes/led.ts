import express, { Request, Response } from 'express';
import pool from '../db';

const router = express.Router();

// GET /led → 현재 LED 상태 조회
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM led_settings ORDER BY id DESC LIMIT 1');
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('LED 상태 조회 실패:', err);
    res.status(500).json({ error: 'LED 상태를 불러오는 데 실패했습니다.' });
  }
});

// POST /led → LED 상태 설정 (전원+색상+밝기)
router.post('/', async (req: Request, res: Response) => {
  const { color, brightness, status } = req.body as {
    color: string;
    brightness: number;
    status: string;
  };

  try {
    await pool.query(
      'INSERT INTO led_settings (color, brightness, status) VALUES ($1, $2, $3)',
      [color, brightness, status]
    );
    res.status(201).json({ message: 'LED 상태가 저장되었습니다.' });
  } catch (err) {
    console.error('LED 설정 실패:', err);
    res.status(500).json({ error: 'LED 설정 중 오류 발생' });
  }
});

export default router;
