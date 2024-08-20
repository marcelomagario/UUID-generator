import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/uuids', (req: Request, res: Response) => {
  const uuids = Array.from({ length: 4 }, () => uuidv4());
  res.json(uuids);
});

export default router;