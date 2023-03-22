import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validate(id: number) {
    // console.log(this.userRepository); - is undefined
    try {
      await User.findOneOrFail({ where: { id } });
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist: ${args}`;
  }
}
