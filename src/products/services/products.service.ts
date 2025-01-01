import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from '../entities/products.entity';
import { Category } from '../entities/category.entity';
import { BrandsService } from './brands.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/Products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    private brandService: BrandsService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Products[]> {
    return this.productsRepository.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`current error product ${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productsRepository.create(payload);
    if (payload.brandId) {
      const brand = await this.brandService.findOne(payload.brandId);
      newProduct.brand = brand;
    }
    if (payload.categoryIds) {
      const categories = await this.categoryRepository.find({
        where: {
          id: In(payload.categoryIds),
        },
      });
      newProduct.categories = categories;
    }
    return this.productsRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({ id });
    if (changes.brandId) {
      const brand = await this.brandService.findOne(changes.brandId);
      product.brand = brand;
    }
    if (changes.categoryIds) {
      const categories = await this.categoryRepository.find({
        where: {
          id: In(changes.categoryIds),
        },
      });
      product.categories = categories;
    }
    this.productsRepository.merge(product, changes);
    return this.productsRepository.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productsRepository.findOne({
      where:{id:productId},
      relations:['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productsRepository.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productsRepository.findOne({
      where:{id:productId},
      relations:['categories'],
    });
    const category = await this.categoryRepository.findOne({
      where:{
        id:categoryId
      }
    });
    product.categories.push(category);
    return this.productsRepository.save(product);
  }

  async remove(id: number) {
    await this.productsRepository.delete(id);
    return {
      message: 'Se elimino con exito',
    };
  }
}
