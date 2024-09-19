import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findOne(id: number, customerId?: string): Promise<Task> {
    return await this.taskRepository.findOne({
      where: { id, customer: { id: customerId } },
      relations: ['customer'],
    });
  }
}
