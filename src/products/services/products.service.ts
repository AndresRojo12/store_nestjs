import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from '../entities/products.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/Products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  findAll(): Promise<Products[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`current error product ${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = this.productsRepository.create(payload);
    return this.productsRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({id});
    this.productsRepository.merge(product, changes);
    return this.productsRepository.save(product);
  }

  async remove(id: number){
    await this.productsRepository.delete(id);
    return {
      message:"Se elimino con exito"
    }
  }

}
