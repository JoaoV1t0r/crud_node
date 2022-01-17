import { Request, Response } from 'express';
import { CategoryUpdateService } from '../../services/CategoryUpdateService';

export class CategoryUpdateController {
  async handle(request: Request, response: Response) {
    const { uuid } = request.params;
    const { name, description } = request.body;

    const service = new CategoryUpdateService();

    const result = await service.execute({ uuid, name, description });

    if (result instanceof Error) {
      const bodyResponse = {
        success: false,
        message: result.message,
      };
      return response.status(400).json(bodyResponse);
    }
    const bodyResponse = {
      success: true,
      message: 'Successfully updated category.',
      data: result,
    };

    return response.json(bodyResponse);
  }
}
