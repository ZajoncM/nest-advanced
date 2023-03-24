import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../user.entity';
import { UserExists } from '../user-exists.decorator';

@InputType()
export class CreateUserDto extends PickType(
  User,
  ['name', 'email', 'externalId'],
  InputType,
) {}

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field(() => Int)
  @UserExists()
  id: number;
}
