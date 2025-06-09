// src/routes/routine.ts

import express, { Request, Response } from 'express';
import pool from '../db';

const router = express.Router();

// 타입 선언
interface RoutineRequestBody {
  name: string;
  time: string;
  enabled?: boolean;
  actions: Record<string, any>;
}

// 📋 모든 루틴 조회
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM routines ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ 루틴 조회 실패:', err);
    res.status(500).json({ error: '루틴을 불러오는 데 실패했습니다.' });
  }
});

// ➕ 루틴 추가
  router.post('/', async (req: Request, res: Response) => {
    const { name, time, enabled, actions } = req.body as {
      name: string;
      time: string;
      enabled?: boolean;
      actions: object;
    };

  try {
    await pool.query(
      'INSERT INTO routines (name, time, enabled, actions) VALUES ($1, $2, $3, $4)',
      [name, time, enabled, actions]
    );
    res.status(201).json({ message: '루틴이 성공적으로 추가되었습니다.'});
  } catch (err) {
    console.error('❌ 루틴 추가 실패:', err);
    res.status(500).json({ error: '루틴 추가 중 오류가 발생했습니다.' });
  }
});

// ❌ 루틴 삭제
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM routines WHERE id = $1', [id]);
    res.status(200).json({ message: '루틴이 삭제되었습니다.' });
  } catch (err) {
    console.error('❌ 루틴 삭제 실패:', err);
    res.status(500).json({ error: '루틴 삭제 중 오류가 발생했습니다.' });
  }
});

export default router;
