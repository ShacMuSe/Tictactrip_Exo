import { Router, Request, Response } from 'express';
import { generateToken } from './auth';

const router = Router(); // Create a new router instance

router.post('/api/token', (req: Request, res: Response): Response => {
  const { email } = req.body; // Extract email from request body
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const token = generateToken(email); // Generate the token
  return res.json({ token }); // Return the token
});

export default router;
