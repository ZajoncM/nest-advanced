import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService implements OnModuleInit, OnApplicationShutdown {
  constructor(
    // We can inject the provided ClsService instance,
    private readonly cls: ClsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async onModuleInit(): Promise<void> {
    console.log('AppService init');
  }

  onApplicationShutdown(signal: string) {
    console.log('shutdown'); // e.g. "SIGINT"
  }

  async getHello() {
    const userId = this.cls.get('test');

    const value = await this.cacheManager.get('test');
    console.log('cacheManager', value);
    if (value) return value;

    await this.cacheManager.set('test', userId);

    return userId;
  }
}
