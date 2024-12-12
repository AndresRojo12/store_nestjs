import { Module } from '@nestjs/common';
import { CustomersServiceTsService } from './../users/services/customers.service.ts.service'
import { UsersService } from './../users/services/users.service.ts.service'
import { UsersController } from './../users/controllers/user.controller'
import { CustomerController } from './../users/controllers/customer.controller'
import { ProductsModule } from './../products/products.module'

@Module({
  imports:[ProductsModule],
  controllers:[UsersController, CustomerController],
  providers:[UsersService, CustomersServiceTsService]
})
export class UsersModule {}
