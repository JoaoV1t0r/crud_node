import { Request, Response } from 'express';
import { CategoryCreateService } from '../../Domains/Categories/Concrete/CategoryCreateService';

export class CategoryCreateController {
  async hande(request: Request, response: Response) {
    const { name, description } = request.body;

    const service = new CategoryCreateService();

    const result = await service.execute({ name, description });

    if (result instanceof Error) {
      const bodyResponse = {
        success: false,
        message: result.message,
      };
      return response.status(400).json(bodyResponse);
    }

    const bodyResponse = {
      success: true,
      message: 'Successfully created category.',
      data: result,
    };

    return response.json(bodyResponse);
  }
}
