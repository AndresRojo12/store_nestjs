import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/Orders.dto';
import { OrdersService } from '../services/orders.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService : OrdersService){}

  @Get()
  getOrders() {
    return this.orderService.findAll();
  }

  @Get(':id')
  getOrder(@Param('id', ParseIntPipe) id: number){
    return this.orderService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateOrderDto){
    return this.orderService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateOrderDto){
    return this.orderService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number){
    return this.orderService.remove(id);
  }
}
