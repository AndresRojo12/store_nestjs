import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
  Column,
} from 'typeorm';

import { Products } from '../../products/entities/products.entity'
import { Order } from './order.entity'


@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({type: 'int'})
  quantity:number;

  @ManyToOne(()=> Products)
  product: Products;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
