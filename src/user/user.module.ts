import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { BookModule } from 'src/book/book.module';
import { UserExistsRule } from './user.validation';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BookModule],
  providers: [UserResolver, UserService, UserExistsRule],
  exports: [UserService],
})
export class UserModule {}
