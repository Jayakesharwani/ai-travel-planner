import { Request, Response } from 'express';
import { authService } from '../services/auth.service';


export async function register(req: Request, res: Response): Promise<void> {
  const result = await authService.register(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
} 


export async function login(req: Request, res: Response): Promise<void> {
  const result = await authService.login(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
} 

 

export async function getMe(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.userId;

  if (!userId) {
    throw new Error('Authentication required');
  }

  const result = await authService.getCurrentUser(userId);

  res.status(200).json({
    success: true,
    data: result,
  });
}
