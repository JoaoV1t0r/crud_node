import { Request, Response } from 'express';
import { UserCreateService } from '../services/UserCreateService';

export class UserCreateController {
  async hande(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const service = new UserCreateService();

    const result = await service.execute({ name, email, password });

    const bodyResponse = {
      success: true,
      message: 'Successfully created user.',
      data: {
        uuid: result.uuid,
        name: result.name,
        email: result.email,
        created_at: new Date(),
      },
    };

    return response.json(bodyResponse);
  }
}
