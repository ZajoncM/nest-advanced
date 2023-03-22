import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { BookService } from 'src/book/book.service';

@Resolver(User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async userCreate(@Args('user') user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Mutation(() => User)
  async userUpdate(@Args('user') book: UpdateUserDto) {
    return this.userService.update(book);
  }

  @ResolveField()
  async books(@Parent() user: User) {
    return this.bookService.findAll(user.id);
  }
}
