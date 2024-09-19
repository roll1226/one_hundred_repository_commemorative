import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findOne(id: string): Promise<Customer> {
    return await this.customerRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }
}
