import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async getByIds(ids: number[]) {
    return this.userRepository.find({
      where: { id: In(ids) },
    });
  }

  async findOne(id: User['id']) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);

    return user.save();
  }

  async update(id: number, userDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...userDto });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user.save();
  }
}
