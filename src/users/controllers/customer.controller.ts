import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CustomersServiceTsService } from './../services/customers.service.ts.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/Customers.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomersServiceTsService){}
  @Get()
  getCustomers() {
    return this.customerService.findAll();
  }

  @Get(':id')
  getCustomer(@Param('id', ParseIntPipe) id:number) {
    return this.customerService.findOne(id);
  }

  @Post()
  create(@Body() data:CreateCustomerDto){
    return this.customerService.create(data);
  }

  @Put(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() data: UpdateCustomerDto){
    return this.customerService.Update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number){
    return this.customerService.remove(id);
  }
}
