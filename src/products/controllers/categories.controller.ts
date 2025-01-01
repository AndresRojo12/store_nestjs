import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  PayloadTooLargeException,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/Categories.dto';
import { CategoriesServiceTsService } from '../services/categories.service.ts.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesServiceTsService) {}
  @Get('')
  getCategories() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  getCategorie(@Param('id', ParseIntPipe) id:number) {
    return this.categoryService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateCategoryDto){
    return this .categoryService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCategoryDto){
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number){
    return this.categoryService.remove(id);
  }
}
