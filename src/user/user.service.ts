import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, MoreThan, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { WhereClauseCondition } from 'typeorm/query-builder/WhereClause';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(cursor?: number) {
    let where: FindOptionsWhere<User> = {};

    if (cursor) {
      where = { id: MoreThan(cursor) };
    }

    const users = await this.userRepository.find({
      order: { id: 'ASC' },
      take: 10,
      where,
    });

    const lastCursor = users.length > 0 ? users[users.length - 1].id : null;

    return { results: users, lastCursor };
  }

  async getByIds(ids: number[]) {
    return this.userRepository.find({
      where: { id: In(ids) },
    });
  }

  async findOne(id: User['id']) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByExternalId(externalId: User['externalId']) {
    return this.userRepository.findOne({ where: { externalId } });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);

    return user.save();
  }

  async update(userDto: UpdateUserDto) {
    const user = await this.userRepository.preload(userDto);

    return user.save();
  }
}
