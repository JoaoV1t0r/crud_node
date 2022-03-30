import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { ICategoriesCreateService } from '../Domains/Categories/Interfaces/ICategoriesCreateService';
import { ICategoryGetAllService } from '../Domains/Categories/Interfaces/ICategoryGetAllService';

@controller('/categories')
export class CategoryController {
  private categoryCreateService: ICategoriesCreateService;
  private categoryGetAllService: ICategoryGetAllService;

  constructor(
    @inject('ICategoriesCreateService') categoryCreateService: ICategoriesCreateService,
    @inject('ICategoryGetAllService') categoryGetAllService: ICategoryGetAllService,
  ) {
    this.categoryCreateService = categoryCreateService;
    this.categoryGetAllService = categoryGetAllService;
  }

  @httpPost('')
  async storeCategory(request: Request, response: Response) {
    try {
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
    } catch (err) {
      response.status(400).json({ error: err.message });
    }
  }

  @httpGet('')
  async getCategories(request: Request, response: Response) {
    try {
      const bodyResponse = {
        success: true,
        message: 'Search performed successfully.',
        data: await this.categoryGetAllService.execute(),
      };

      return response.json(bodyResponse);
    } catch (err) {
      response.status(400).json({ error: err.message });
    }
  }
}
