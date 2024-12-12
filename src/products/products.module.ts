import { Module } from '@nestjs/common';
import { ProductsService } from './../products/services/products.service';
import { CategoriesServiceTsService } from './../products/services/categories.service.ts.service';

import { CategoriesController } from './../products/controllers/categories.controller';
import { ProductsController } from './../products/controllers/products.controller';

@Module({
  controllers: [CategoriesController, ProductsController],
  providers: [ProductsService, CategoriesServiceTsService],
  exports:[ProductsService],
})
export class ProductsModule {}
