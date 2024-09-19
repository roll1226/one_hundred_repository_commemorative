import { HasuraModule } from '@golevelup/nestjs-hasura';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmConfigService } from './db/database.config';
import { TaskModule } from './task/tasks.module';

const configService = new ConfigService();

@Module({
  imports: [
    CustomerModule,
    TaskModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      sortSchema: true,
    }),
    HasuraModule.forRoot(HasuraModule, {
      webhookConfig: {
        secretFactory: 'secret',
        secretHeader: 'secret-header',
      },
      managedMetaDataConfig: {
        metadataVersion: 'v3',
        dirPath: configService.get('NESTJS_HASURA_METADATA_PATH'),
        secretHeaderEnvName: 'NESTJS_EVENT_WEBHOOK_SHARED_SECRET',
        nestEndpointEnvName: 'NESTJS_EVENT_WEBHOOK_ENDPOINT',
        defaultEventRetryConfig: {
          intervalInSeconds: 15,
          numRetries: 3,
          timeoutInSeconds: 100,
          toleranceSeconds: 21600,
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`],
      load: [],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
