import { Request, Response } from 'express';
import { CategoriesGetAllService } from '../../services/CategoriesGetAllService';

export class CategoriesGetAllController {
  async handle(request: Request, response: Response) {
    const service = new CategoriesGetAllService();

    const bodyResponse = {
      success: true,
      message: 'Search performed successfully.',
      data: await service.execute(),
    };

    return response.json(bodyResponse);
  }
}
