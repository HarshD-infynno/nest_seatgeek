import { Controller, Get, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/:id')
  @HttpCode(200)
  getSignature() {
    return this.categoriesService.signature();
  }
}
