import { TaskService } from './task.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task';
import { Customer } from 'src/customer/customer';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Customer]),
  ],
  providers: [TaskResolver, TaskService],
  exports: [TaskService],
})
export class TaskModule {}
