import { Request, Response } from 'express';
import { CategoryCreateService } from '../../Domains/Categories/Concrete/CategoryCreateService';
import { ICategoriesCreateService } from '../../Domains/Categories/Interfaces/ICategoriesCreateService';

export class CategoryCreateController {
  private categoryCreateService: ICategoriesCreateService;

  async handle(request: Request, response: Response) {
    this.categoryCreateService = CategoryCreateService.build();

    const { name, description } = request.body;

    const result = await this.categoryCreateService.execute({
      description,
      name,
    });

    const bodyResponse = {
      success: true,
      message: 'Successfully created category.',
      data: {
        uuid: result.uuid,
        name: result.name,
        description: result.description,
        created_at: new Date(),
      },
    };

    return response.json(bodyResponse);
  }

  public setCategoriesCreateService(): void {
    this.categoryCreateService = CategoryCreateService.build();
  }
}
