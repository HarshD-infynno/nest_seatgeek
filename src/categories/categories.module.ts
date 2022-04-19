import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '../prisma.service';
import { Categories } from '../utils/const';
@Module({
  imports: [HttpModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, Categories],
})
export class CategoriesModule {}
