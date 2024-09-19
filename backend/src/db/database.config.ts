import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Customer } from 'src/customer/customer';
import { Task } from 'src/task/task';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService();
    return {
      type: 'postgres',
      host: configService.get('NESTJS_DATABASE_HOST'),
      port: configService.get('NESTJS_DATABASE_PORT'),
      username: configService.get('NESTJS_DATABASE_USER'),
      password: configService.get('NESTJS_DATABASE_PASSWORD'),
      database: configService.get('NESTJS_DATABASE_DB'),
      schema: configService.get('NESTJS_DATABASE_SCHEMA'),
      entities: [Customer, Task],
      synchronize: false,
    };
  }
}
