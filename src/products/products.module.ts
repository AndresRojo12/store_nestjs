import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './../products/services/products.service';
import { ProductsController } from './../products/controllers/products.controller';
import { Products } from './entities/products.entity';
import { CategoriesServiceTsService } from './../products/services/categories.service.ts.service';
import { CategoriesController } from './../products/controllers/categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [CategoriesController, ProductsController],
  providers: [ProductsService, CategoriesServiceTsService],
  exports:[ProductsService],
})
export class ProductsModule {}
