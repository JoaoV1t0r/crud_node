import { getRepository } from 'typeorm';
import { Category } from '../Entities/Category';
import { Videos } from '../Entities/Videos';

type VideoCreateRequest = {
  name: string;
  description: string;
  duration: number;
  category_uuid: number;
};
export class VideosCreateService {
  async execute(request: VideoCreateRequest) {
    const repoVideos = getRepository(Videos);

    const repoCategories = getRepository(Category);

    const category = await repoCategories.findOne({ where: { uuid: request.category_uuid } });

    if (!category) {
      return new Error('Category does not exists!');
    }
    if (await repoVideos.findOne({ name: request.name })) {
      return new Error('Video already exists.');
    }

    const video = repoVideos.create({
      name: request.name,
      description: request.description,
      duration: request.duration,
      category_id: category.id,
    });

    await repoVideos.save(video);

    return video;
  }
}
