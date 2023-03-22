import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/utils/gql-auth.guard';
import BookLoaders from './book.loader';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

const pubSub = new PubSub();

@Resolver(Book)
@UseGuards(GqlAuthGuard)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly userService: UserService,
    private readonly bookLoaders: BookLoaders,
  ) {}

  @Query(() => [Book])
  books() {
    return this.bookService.findAll();
  }

  @Mutation(() => Book)
  async bookCreate(@Args('book') bookDto: CreateBookDto) {
    const book = await this.bookService.create(bookDto);

    pubSub.publish('bookAdded', { bookAdded: book });

    return book;
  }

  @Mutation(() => Book)
  async bookUpdate(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args('book') bookDto: UpdateBookDto,
  ) {
    const book = await this.bookService.update(id, bookDto);

    pubSub.publish('bookUpdated', { bookUpdated: { ...book } });

    return book;
  }

  // @Subscription(() => Book)
  // bookAdded() {
  //   return pubSub.asyncIterator('bookAdded');
  // }

  // @Subscription(() => Book, {
  //   filter: (payload, variables) => payload.bookUpdated.id === variables.id,
  // })
  // bookUpdated(@Args('id') id: number) {
  //   return pubSub.asyncIterator('bookUpdated');
  // }

  @ResolveField(() => User)
  async user(@Parent() book: Book) {
    // return this.userService.findOne(book.userId);

    const { userId } = book;

    return this.bookLoaders.batchUsers.load(userId);
  }
}
