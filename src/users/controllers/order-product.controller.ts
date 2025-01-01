import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateOrderProductDto } from '../dtos/order-product.dto';
import { OrderProductService } from '../services/order-product.service';

@Controller('order-product')
export class OrderProductController {
  constructor(private orderProductService : OrderProductService){}

  @Get()
  getOrderProduct(){
    return this.orderProductService.findAll();
  }

  @Get(':id')
  getOrdersProduct(@Param('id', ParseIntPipe) id: number){
    return this.orderProductService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateOrderProductDto){
    return this.orderProductService.create(data);
  }
}
