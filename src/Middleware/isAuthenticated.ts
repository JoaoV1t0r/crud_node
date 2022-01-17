import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default function isAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      success: false,
      message: 'Token is missing.',
    });
  }

  const [, token] = authToken.split(' ');

  try {
    verify(token, '2e713746-533e-4b7e-af9d-638c93e1c6f9');

    return next();
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: 'Token invalid.',
    });
  }
}
