import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { UserController } from './controllers/user.controller';
import { CustomerController } from './controllers/customer.controller';
import { OrderController } from './controllers/order.controller';
import { BrandController } from './controllers/brand.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController, UserController, CustomerController, OrderController, BrandController],
  providers: [AppService],
})
export class AppModule {}
