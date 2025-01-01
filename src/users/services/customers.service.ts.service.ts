import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/Customers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'

@Injectable()

export class CustomersServiceTsService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ){}

  findAll(): Promise<Customer[]>{
    return this.customerRepository.find();
  }

  async findOne(id: number){
    const customer = await this.customerRepository.findOneBy({id});
    if(!customer){
      throw new NotFoundException(`current error customer ${id} not found`)
    }
    return customer;
  }

  create(data:CreateCustomerDto){
    const newCustomer = this.customerRepository.create(data);
    return this.customerRepository.save(newCustomer);
  }

  async Update(id: number, changes: UpdateCustomerDto){
    const customer  = await this.customerRepository.findOneBy({id});
    this.customerRepository.merge(customer, changes);
    return this.customerRepository.save(customer);
  }

  async remove(id:number) {
    await this.customerRepository.delete(id);
    return {
      message: "Se elimino con exito"
    }
  }
}
