import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from '../entities/products.entity';
import { Category } from '../entities/category.entity';
import { BrandsService } from './brands.service';
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from '../dtos/Products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, Between, FindOptionsWhere } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    private brandService: BrandsService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(params?: FilterProductsDto): Promise<Products[]> {
    if(params){
      const where: FindOptionsWhere<Products> = {}
      const { limit, offset} = params;
      const { maxPrice, minPrice} = params;
      if(minPrice && maxPrice){
        where.price = Between(minPrice, maxPrice)
      }

      return this.productsRepository.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
        order: {
          name: 'ASC'
        }
      });
    }
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

    if (!payload.imagen) {
      throw new Error('No se proporcionó imagen para el producto');
    }

    if (payload.brandId) {
      const brand = await this.brandService.findOne(payload.brandId);
      newProduct.brand = brand;
    }
    if (payload.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: payload.categoryId },
      });

      if (!category) {
        throw new Error('Categoría no encontrada');
      }

      newProduct.categories = [category]; // si la relación sigue siendo many-to-many
    }

    return this.productsRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({ id });
    if (changes.brandId) {
      const brand = await this.brandService.findOne(changes.brandId);
      product.brand = brand;
    }
    if (changes.categoryId) {
      const categori = await this.categoryRepository.findOne({
        where: {
          id: changes.categoryId,
        },
      });
      product.categories = [categori];
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


