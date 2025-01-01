import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersServiceTsService } from './../users/services/customers.service.ts.service'
import { Customer } from './entities/customer.entity'
import { CustomerController } from './../users/controllers/customer.controller'
import { UsersService } from './../users/services/users.service.ts.service'
import { UsersController } from './../users/controllers/user.controller'
import { User } from './entities/user.entity'
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity'
import { ProductsModule } from './../products/products.module'
import { OrderController } from './controllers/order.controller';
import { OrdersService } from './services/orders.service';
import { OrderProductController } from './controllers/order-product.controller';
import { OrderProductService } from './services/order-product.service';

@Module({
  imports:[ProductsModule, TypeOrmModule.forFeature([User,Customer,Order,OrderProduct])],
  controllers:[UsersController, CustomerController,OrderController, OrderProductController],
  providers:[UsersService, CustomersServiceTsService,OrdersService, OrderProductService]
})
export class UsersModule {}
