import { Body, Controller,  Delete, ParseIntPipe, Get, Post, Put, Param } from '@nestjs/common';
import { BrandsService } from './../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from './../dtos/Brands.dto';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandsService) {}
  @Get()
  getBrands() {
    return this.brandService.findAll();
  }

  @Get(':id')
  getBrand(@Param('id', ParseIntPipe) id:number){
    return this.brandService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBrandDto){
    return this.brandService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number){
    return this.brandService.remove(id);
  }
}
