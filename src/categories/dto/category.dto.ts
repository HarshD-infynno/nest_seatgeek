import { Allow } from 'class-validator';
export class CreateCategoryDto {
  @Allow()
  id: number;

  @Allow()
  name: string;

  @Allow()
  slug: string;

  @Allow()
  url: string;

  @Allow()
  slug_url: string;

  @Allow()
  updated_at: string;

  @Allow()
  parent: number;
}
