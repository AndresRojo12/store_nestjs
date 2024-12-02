import { Body, Controller, Get, Param, PayloadTooLargeException, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  newEmpoint() {
    return {
      message:'Es nueva ruta pa'
    }
  }

  @Get(':id')
  getProducts(@Param() params: any) {
    return `Este es un producto ${params.id}`;
  }

  @Post()
  create(@Body() payload:any) {
    return {
      message: 'Creando un producto',
      payload
    }
  }
}
