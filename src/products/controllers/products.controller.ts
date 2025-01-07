import { Body, Controller, Delete, Get, Param, ParseIntPipe, PayloadTooLargeException, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './../services/products.service';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from './../dtos/Products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService){}
  @Get()
  newEmpoint(
    @Query() params: FilterProductsDto
  ) {
    return this.productsService.findAll(params);
  }

  @Get(':id')
  getProducts(@Param('id', ParseIntPipe) id:number) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload:CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductDto){
    return this.productsService.update(id,payload);
  }

  @Put(':id/category/:categoryId')
  updateCategoryProduct(@Param('id', ParseIntPipe) id: number, @Param('categoryId', ParseIntPipe) categoryId: number){
    return this.productsService.addCategoryToProduct(id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number){
    return this.productsService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategorie(@Param('id', ParseIntPipe) id: number, @Param('categoryId', ParseIntPipe) categoryId: number){
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
