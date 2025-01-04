import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateOrderProductDto, UpdateOrderProductDto } from '../dtos/order-product.dto';
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

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdateOrderProductDto){
    return this.orderProductService.update(id,changes);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id:number){
    return this.orderProductService.remove(id);
  }
}
