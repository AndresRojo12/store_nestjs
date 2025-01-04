import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateOrderProductDto,
  UpdateOrderProductDto,
} from './../dtos/order-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './../entities/order.entity';
import { OrderProduct } from './../entities/order-product.entity';
import { Products } from './../../products/entities/products.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(Order)
    private orderReposi: Repository<Order>,
    @InjectRepository(OrderProduct)
    private orderProductReposi: Repository<OrderProduct>,
    @InjectRepository(Products)
    private ProductsReposi: Repository<Products>,
  ) {}

  findAll(): Promise<OrderProduct[]> {
    return this.orderProductReposi.find();
  }

  async findOne(id: number){
    const orderProduct = await this.orderProductReposi.findOne({
      where:{id},
      relations:['order', 'product']
    });
    if(!orderProduct){
      throw new NotFoundException(`Current error order product ${id} not found`)
    }
    return orderProduct;
  }

  async create(data: CreateOrderProductDto) {
    const order = await this.orderReposi.findOne({
      where: {
        id: data.orderId,
      },
    });
    const product = await this.ProductsReposi.findOne({
      where: {
        id: data.productId,
      },
    });
    const orderProduct = new OrderProduct();
    orderProduct.order = order;
    orderProduct.product = product;
    orderProduct.quantity = data.quantity;
    return this.orderProductReposi.save(orderProduct);
  }

  async update(id: number, changes: UpdateOrderProductDto){
    const orderProduct = await this.orderProductReposi.findOneBy({id});
    if(changes.orderId){
      const order = await this.orderReposi.findOne({
        where:{
          id: changes.orderId
        }
      });
      orderProduct.order = order;
    }
    if(changes.productId){
      const product = await this.ProductsReposi.findOne({
        where:{
          id: changes.productId
        }
      });
      orderProduct.product = product;
    }
    this.orderProductReposi.merge(orderProduct, changes);
    return this.orderProductReposi.save(orderProduct);
  }

  async remove(id:number){
    await this.orderProductReposi.delete(id);
    return {
      message:'Se elimino',
    }
  }

}
