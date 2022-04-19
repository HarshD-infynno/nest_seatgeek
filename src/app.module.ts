import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { PerformersModule } from './performers/performers.module';
import { VenuesModule } from './venues/venues.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CategoriesModule,
    PerformersModule,
    VenuesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
