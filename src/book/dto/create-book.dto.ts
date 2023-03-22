import { Field, ID, InputType, PartialType, PickType } from '@nestjs/graphql';
import { Book } from '../book.entity';

@InputType()
export class CreateBookDto extends PickType(Book, ['name'], InputType) {
  @Field(() => ID)
  userId: number;
}

@InputType()
export class UpdateBookDto extends PartialType(CreateBookDto) {}
