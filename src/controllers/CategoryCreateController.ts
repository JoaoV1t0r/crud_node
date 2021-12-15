import { Request, Response } from 'express';
import { CategoryCreateService } from '../services/CategoryCreateService';

export class CategoryCreateController {
  async hande(request: Request, response: Response) {
    console.log(request.body);

    const { name, description } = request.body;

    const service = new CategoryCreateService();

    const result = await service.execute({ name, description });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
