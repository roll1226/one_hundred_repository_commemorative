import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';
import { Task } from 'src/task/task';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [CustomerResolver, CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
