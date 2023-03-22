import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  Index,
} from 'typeorm';

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => User)
  @Index('book_userId_index')
  @ManyToOne(() => User, (user) => user.books)
  user: User;

  @RelationId((book: Book) => book.user)
  userId: number;
}
