import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  JoinColumn
} from 'typeorm';

import { Brands } from './Brands.entity';
import { Category } from './category.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true })
  name: String;
  @Column({ type: 'text' })
  description: String;
  @Index()
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'int' })
  stock: number;
  @Column({ type: 'varchar' })
  imagen: String;
  @CreateDateColumn({  name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({  name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @ManyToOne(() => Brands, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id'})
  brand: Brands;
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({name: 'products_categories',
  joinColumn: {
    name: 'product_id',
  },
  inverseJoinColumn: {
    name: 'category_id'
  }
})
  categories:Category[];
}
