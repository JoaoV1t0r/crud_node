import { Request, Response } from 'express';
import { VideoGetAllService } from '../services/VideoGetAllService';

export class VideoGetAllController {
  async handle(request: Request, response: Response) {
    const service = new VideoGetAllService();

    const bodyResponse = {
      success: true,
      message: 'Search performed successfully.',
      data: await service.execute(),
    };

    return response.json(bodyResponse);
  }
}
