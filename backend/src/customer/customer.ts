import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/task/task';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('customers')
@ObjectType()
export class Customer {
  @PrimaryColumn({
    name: 'id',
    unsigned: true,
    type: 'text',
    comment: 'Customer ID',
  })
  @Field(() => ID)
  readonly id: string;

  @Column('text', { comment: 'メールアドレス' })
  @Field()
  readonly email: string;

  @Column('text', { comment: 'ユーザー名' })
  @Field()
  readonly username: string;

  @CreateDateColumn({ comment: '作成日時' })
  @Field()
  readonly created_at: Date;

  @UpdateDateColumn({ comment: '更新日時' })
  @Field()
  readonly updated_at: Date;

  @OneToMany(() => Task, (task) => task.customer)
  @Field(() => [Task])
  readonly tasks: Task[];
}
