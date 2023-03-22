import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../user.entity';

@InputType()
export class CreateUserDto extends PickType(User, ['name'], InputType) {}

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {}
