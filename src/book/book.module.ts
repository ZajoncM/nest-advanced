import { Module, forwardRef } from '@nestjs/common';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { GqlAuthGuard } from 'src/utils/gql-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => UserModule)],
  providers: [GqlAuthGuard, BookResolver, BookService],
  exports: [BookService],
})
export class BookModule {}
