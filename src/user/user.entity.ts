import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/book/book.entity';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { UserExists } from './user-exists.decorator';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  // @UserExists()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Book])
  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  externalId: string;
}
