import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../user.entity';
import { Validate } from 'class-validator';
import { UserExistsRule } from '../user.validation';

@InputType()
export class CreateUserDto extends PickType(
  User,
  ['name', 'email', 'externalId'],
  InputType,
) {}

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field(() => Int)
  @Validate(UserExistsRule)
  id: number;
}
