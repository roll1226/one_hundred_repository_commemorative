import { Args, Query, Resolver } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './customer';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private customerService: CustomerService) {}

  @Query(() => Customer)
  async getCustomer(
    @Args({ name: 'customerId' }) customerId: string,
  ): Promise<Customer> {
    return await this.customerService.findOne(customerId);
  }
}
