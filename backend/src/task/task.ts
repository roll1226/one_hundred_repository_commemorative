import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Customer } from 'src/customer/customer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'int',
    comment: 'タスクID',
  })
  @Field(() => ID)
  readonly id: number;

  @Column('text', { comment: 'タスク名' })
  @Field()
  readonly name: string;

  @CreateDateColumn({ comment: '作成日時' })
  @Field()
  readonly created_at: Date;

  @UpdateDateColumn({ comment: '更新日時' })
  @Field()
  readonly updated_at: Date;

  @ManyToOne(() => Customer, (customer) => customer.tasks)
  @Field(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  readonly customer: Customer;
}
