import { Request, Response, NextFunction } from 'express';

const VALID_API_KEY = process.env.API_SECRET; 

export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === VALID_API_KEY) {
    next();
  } else {
    res.status(401).json({ 
      error: { 
        code: 401, 
        message: 'Invalid or missing API key.' 
      } 
    })
  }
};