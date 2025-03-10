import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from './../dtos/Users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from './../../products/services/products.service';
import { CustomersServiceTsService } from './customers.service.ts.service'

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private customerService: CustomersServiceTsService,
  ) {}

  findAll(): Promise<User[]> {

    return this.userRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  findByEmail(email:string){
    return this.userRepository.findOne({where: {email}});
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if(data.customerId){
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return this.userRepository.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id});
    this.userRepository.merge(user, changes);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return {
      message: "Se elimino con exito"
    }
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
