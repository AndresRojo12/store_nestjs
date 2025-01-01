import { Injectable, NotFoundException } from '@nestjs/common';
import { Brands } from '../entities/Brands.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/Brands.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brands)
    private brandsRepository: Repository<Brands>,
  ) {}

  findAll(): Promise<Brands[]> {
    return this.brandsRepository.find();
  }

  async findOne(id: number) {
    const brands = await this.brandsRepository.findOne({
      where: {id},
      relations:['products'],
    });
    if (!brands) {
      throw new NotFoundException(`current error brand ${id} not found`);
    }
    return brands;
  }

  create(payload: CreateBrandDto) {
    const newBrand = this.brandsRepository.create(payload);
    return this.brandsRepository.save(newBrand);
  }

   async update(id: number, changes: UpdateBrandDto){
    const brand = await this.brandsRepository.findOneBy({id});
    this.brandsRepository.merge(brand, changes);
    return this.brandsRepository.save(brand);
  }

  async remove(id: number){
    await this.brandsRepository.delete(id);
    return {
      message:"Se elimino con exito"
    }
  }
}
