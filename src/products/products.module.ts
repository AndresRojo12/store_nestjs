import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/common/config/multer.config';

import { ProductsService } from './../products/services/products.service';
import { ProductsController } from './../products/controllers/products.controller';
import { Products } from './entities/products.entity';
import { BrandsService } from './../products/services/brands.service';
import { BrandController } from './../products/controllers/brand.controller'
import { Brands } from './entities/Brands.entity';
import { Category } from './entities/category.entity'
import { CategoriesServiceTsService } from './../products/services/categories.service.ts.service';
import { CategoriesController } from './../products/controllers/categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Brands, Category]), MulterModule.register(multerConfig)],
  controllers: [CategoriesController, ProductsController,BrandController],
  providers: [ProductsService, CategoriesServiceTsService,BrandsService],
  exports:[ProductsService, TypeOrmModule],
})
export class ProductsModule {}
