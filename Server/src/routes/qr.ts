import express, { Request, Response } from "express";
import pool from "../db"; // default export 기준

const router = express.Router();

/**
 * QR 코드 생성 - POST /qr/export
 * qr_code = "routine_{routine_id}" 형태로 저장
 */
  router.post("/export", async (req: Request, res: Response): Promise<void> => {
    const { routine_id } = req.body;

    if (!routine_id) {
      res.status(400).json({ error: "routine_id is required" });
      return;
    }

    const qrCode = `routine_${routine_id}`;

    try {
      await pool.query(
        "INSERT INTO routine_qr (routine_id, qr_code) VALUES ($1, $2)",
        [routine_id, qrCode]
      );

      res.status(201).json({ qr_code: qrCode });
    } catch (err) {
      console.error("QR 생성 실패:", err);
      res.status(500).json({ error: "QR 생성 실패" });
    }
  });


router.post("/import", async (req: Request, res: Response): Promise<void> => {
  const { qr_code } = req.body;

  if (!qr_code || !qr_code.startsWith("routine_")) {
    res.status(400).json({ error: "잘못된 qr_code 형식입니다." });
    return;
  }

  const routine_id = parseInt(qr_code.replace("routine_", ""), 10);

  if (isNaN(routine_id)) {
    res.status(400).json({ error: "루틴 ID 파싱 실패" });
    return;
  }

  try {
    const result = await pool.query(
      "SELECT * FROM routines WHERE id = $1",
      [routine_id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "루틴이 존재하지 않습니다." });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("QR 루틴 불러오기 실패:", err);
    res.status(500).json({ error: "루틴 불러오기 중 에러 발생" });
  }
});

export default router;
