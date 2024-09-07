import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import client from '../redisClient'; // Ajuste o caminho conforme necessário

const router = express.Router();

router.get('/uuids', async (req: Request, res: Response) => {
  const cacheKey = 'uuids';
  
  try {
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    } else {
      const uuids = Array.from({ length: 4 }, () => uuidv4());
      
      await client.setEx(cacheKey, 600, JSON.stringify(uuids));

      res.json(uuids);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send('Unexpected error');
  }
});

export default router;
