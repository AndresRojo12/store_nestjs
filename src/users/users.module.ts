import { Module } from '@nestjs/common';
import { CustomersServiceTsService } from './../users/services/customers.service.ts.service'
import { UsersServiceTsService } from './../users/services/users.service.ts.service'
import { UserController } from './../users/controllers/user.controller'
import { CustomerController } from './../users/controllers/customer.controller'

@Module({
  controllers:[UserController, CustomerController],
  providers:[UsersServiceTsService, CustomersServiceTsService]
})
export class UsersModule {}
