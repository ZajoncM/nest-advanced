import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/utils/paginated';
import { User } from './user.entity';

@ObjectType()
export class PaginatedUser extends Paginated(User) {}
