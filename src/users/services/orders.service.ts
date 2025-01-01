import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/Orders.dto';
import { Order } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations:['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`Current error order ${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where:{
          id:data.customerId
        }
      });
      order.customer = customer;
    }
    return this.orderRepository.save(order);
  }

  async update(id:number, changes:UpdateOrderDto){
    const order = await this.orderRepository.findOneBy({id})
    if(changes.customerId){
      const customer = await this.customerRepo.findOne({
        where:{
          id:changes.customerId
        }
      });
      order.customer = customer;
      return this.orderRepository.save(order);
    }
  }

  async remove(id:number){
    await this.orderRepository.delete(id);
    return {
      message:'Se elimino con exito'
    }
  }
}
