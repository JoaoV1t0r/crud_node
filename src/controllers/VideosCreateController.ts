import { Request, Response } from 'express';
import { CategoryCreateService } from '../services/CategoryCreateService';
import { VideosCreateService } from '../services/VideosCreateService';

export class VideosCreateController {
  async handle(request: Request, response: Response) {
    const { name, description, duration, category_uuid } = request.body;

    const service = new VideosCreateService();

    const result = await service.execute({ name, description, duration, category_uuid });

    if (result instanceof Error) {
      const bodyResponse = {
        success: false,
        message: result.message,
      };
      return response.status(400).json(bodyResponse);
    }

    const bodyResponse = {
      success: true,
      message: 'Successfully created video.',
      data: result,
    };

    return response.json(bodyResponse);
  }
}
