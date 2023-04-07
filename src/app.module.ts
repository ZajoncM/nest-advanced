import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClsModule } from 'nestjs-cls';
import { ExampleService } from './example/example.service';
import { ExampleTwoService } from './example-two/example-two.service';
import { ExampleThreeService } from './example-three/example-three.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { BookModule } from './book/book.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { GqlAuthGuard } from './utils/gql-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { AuthzModule } from './authz/authz.module';
import { ItemsModule } from './items/items.module';
import { XdService } from './xd/xd.service';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    CacheModule.register(),
    ClsModule.forRoot({
      middleware: {
        // automatically mount the
        // ClsMiddleware for all routes
        mount: true,
        // and use the setup method to
        // provide default store values.
        setup: (cls, req) => {
          cls.set('test', req.headers['test']);
        },
      },
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    DatabaseModule,
    UserModule,
    BookModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // POSTGRES_HOST: Joi.string().required(),
        // POSTGRES_PORT: Joi.number().required(),
        // POSTGRES_USER: Joi.string().required(),
        // POSTGRES_PASSWORD: Joi.string().required(),
        // POSTGRES_DB: Joi.string().required(),
        // JWT_SECRET: Joi.string().required(),
        // JWT_EXPIRATION_TIME: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
        // PORT: Joi.number(),
      }),
    }),
    FileModule,
    AuthzModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [
    GqlAuthGuard,
    AppService,
    ExampleService,
    ExampleTwoService,
    ExampleThreeService,
    XdService,
  ],
})
export class AppModule {}
