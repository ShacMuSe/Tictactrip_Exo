import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './auth';

const wordLimits: { [key: string]: { wordCount: number, resetTime: number } } = {};

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  // Check if the authorization header exists and contains a Bearer token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  // Extract the token
  const token = authHeader.split(' ')[1];
  
  // Verify the token
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).send('Unauthorized: Invalid token');
  }

  const currentTime = Date.now();
  if (!wordLimits[decoded.email] || wordLimits[decoded.email].resetTime < currentTime) {
    wordLimits[decoded.email] = { wordCount: 0, resetTime: currentTime + 24 * 60 * 60 * 1000 };
  }

  const textWordCount = req.body.split(/\s+/).length;
  if (wordLimits[decoded.email].wordCount + textWordCount > 80000) {
    return res.status(402).send('Payment Required: Word limit exceeded');
  }

  wordLimits[decoded.email].wordCount += textWordCount;
  next();
};
