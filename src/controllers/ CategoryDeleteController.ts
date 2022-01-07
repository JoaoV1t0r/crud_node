import { Request, Response } from 'express';
import { CategoryDeleteService } from '../services/CategoryDeleteService';

export class CategoryDeleteController {
  async handle(request: Request, response: Response) {
    const { uuid } = request.params;

    const service = new CategoryDeleteService();

    const result = await service.execute(uuid);

    if (result instanceof Error) {
      const bodyResponse = {
        success: false,
        message: result.message,
      };
      return response.status(400).json(bodyResponse);
    }

    return response.status(204).end();
  }
}
