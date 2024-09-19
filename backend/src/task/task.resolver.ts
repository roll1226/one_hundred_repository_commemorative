import { Task } from './task';
import { TaskService } from './task.service';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TaskResolver {
  constructor(private tasksService: TaskService) {}

  @Query(() => Task)
  async getTask(
    @Args({ name: 'taskId' }) taskId: number,
    @Args({ name: 'customerId', nullable: true }) customerId: string,
  ): Promise<Task> {
    return await this.tasksService.findOne(taskId, customerId);
  }
}
