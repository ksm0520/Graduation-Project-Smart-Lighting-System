import express, { Request, Response } from 'express';
import pool from '../db';

const router = express.Router();

// GET /alarm → 전체 알람 조회
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM alarms ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('알람 조회 실패:', err);
    res.status(500).json({ error: '알람을 불러오는 데 실패했습니다.' });
  }
});

// POST /alarm → 알람 등록
router.post('/', async (req: Request, res: Response) => {
  const { status, time } = req.body as { status: string; time: string };

  try {
    await pool.query(
      'INSERT INTO alarms (status, time) VALUES ($1, $2)',
      [status, time]
    );
    res.status(201).json({ message: '알람이 등록되었습니다.' });
  } catch (err) {
    console.error('알람 등록 실패:', err);
    res.status(500).json({ error: '알람 등록 중 오류 발생' });
  }
});

// DELETE /alarm/:id → 알람 삭제
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM alarms WHERE id = $1', [id]);
    res.status(200).json({ message: '알람이 삭제되었습니다.' });
  } catch (err) {
    console.error('알람 삭제 실패:', err);
    res.status(500).json({ error: '알람 삭제 중 오류 발생' });
  }
});

export default router;
