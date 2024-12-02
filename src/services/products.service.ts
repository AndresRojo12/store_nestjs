import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products =[{
    id:1,
    name:'Papa',
    description:'Esta carita',
  }];
}
