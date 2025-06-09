// src/routes/qr.ts

import express, { Request, Response } from 'express';
import pool from '../db';

const router = express.Router();

// ✅ QR 코드 가져오기 (Export)
router.get('/export', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM routines');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ QR export 실패:', err);
    res.status(500).json({ error: '루틴을 가져오는 데 실패했습니다.' });
  }
});

// ✅ QR 코드로 루틴 등록 (Import)
router.post('/import', async (req: Request, res: Response) => {
  const routines = req.body.routines as {
    name: string;
    time: string;
    enabled?: boolean;
    actions: object;
  }[];

  try {
    for (const routine of routines) {
      const { name, time, enabled = true, actions } = routine;
      await pool.query(
        `INSERT INTO routines (name, time, enabled, actions)
         VALUES ($1, $2, $3, $4)`,
        [name, time, enabled, actions]
      );
    }
    res.status(201).json({ message: 'QR로 루틴 가져오기 완료' });
  } catch (err) {
    console.error('❌ QR import 실패:', err);
    res.status(500).json({ error: 'QR 루틴 등록 중 오류 발생' });
  }
});

export default router;
