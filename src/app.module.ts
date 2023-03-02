import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClsModule } from 'nestjs-cls';
import { ExampleService } from './example/example.service';
import { ExampleTwoService } from './example-two/example-two.service';
import { ExampleThreeService } from './example-three/example-three.service';

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
  ],
  controllers: [AppController],
  providers: [AppService, ExampleService, ExampleTwoService, ExampleThreeService],
})
export class AppModule {}
