import { Injectable } from '@nestjs/common';
import { Brands } from '../entities/Brands.entity';
import { CreateBrandDto } from '../dtos/Brands.dto';
@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brands[]=[{
    id:1,
    name: 'capier',
  }];

  findAll() {
    return this.brands;
  }

  create(payload: CreateBrandDto){
    this.counterId = this.counterId +1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    }
    this.brands.push(newBrand);
    return newBrand;


  }
}
