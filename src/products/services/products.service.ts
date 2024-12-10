import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from '../entities/products.entity';
import { CreateProductDto } from '../dtos/Products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Products[]=[{
    id:1,
    name:'Papa',
    description:'Está carita',
    price:1512,
    stock:5,
    imagen:'',
  }];

  findAll(){
    return this.products;
  }

  findOne(id: number){
    const product= this.products.find((item) => item.id === id);
    if(!product){
      throw new NotFoundException(`current error product ${id} not found`)
    }
    return product;
  }

  create(payload: CreateProductDto){
    this.counterId = this.counterId +1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    }
    this.products.push(newProduct);
    return newProduct;
  }

  update(id:number, payload:any){
    const product = this.findOne(id);
    if(product){
      const index = this.products.findIndex((item)=> item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      }

      return this.products[index];
    }
    return null;
  }

  delete(id:number){
    const index = this.products.findIndex((item)=> item.id === id);
    if(index ===-1){
      throw new NotFoundException(`current error product delete ${id} not found`);
    }
    this.products.splice(index,1);
    return {
      message:"sucessfuly",
    }
  }

}
