import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandsService } from './../services/brands.service';
import { CreateBrandDto } from './../dtos/Brands.dto';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandsService) {}
  @Get()
  getBrands() {
    return this.brandService.findAll();
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }
}
