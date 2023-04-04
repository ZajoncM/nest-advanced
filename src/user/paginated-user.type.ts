import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class PaginatedUser {
  @Field(() => [User])
  results: User[];

  @Field()
  lastCursor: number;
}
