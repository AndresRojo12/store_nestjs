import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/Categories.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesServiceTsService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ){}

  findAll(): Promise<Category[]>{
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where:{id},
      relations:['products']
    });
    if(!category){
      throw new NotFoundException(`Current error category ${id} not found`);
    }
    return category
  }

  async create(data: CreateCategoryDto){
    const newCategory = await this.categoryRepository.create(data);
    return this.categoryRepository.save(newCategory);
  }

  async update(id:number, changes: UpdateCategoryDto){
    const category = await this.categoryRepository.findOneBy({id})
    this.categoryRepository.merge(category, changes);
    return this.categoryRepository.save(category);
  }

  async remove(id: number){
    await this.categoryRepository.delete(id);
    return {
      message: 'Se elimino con exito'
    }
  }
}
