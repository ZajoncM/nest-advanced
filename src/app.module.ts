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
import { TestGuard } from './utils/test.guard';
import { BookModule } from './book/book.module';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    DatabaseModule,
    UserModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [
    TestGuard,
    AppService,
    ExampleService,
    ExampleTwoService,
    ExampleThreeService,
  ],
})
export class AppModule {}
