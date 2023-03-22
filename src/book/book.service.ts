import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly userService: UserService,
  ) {}

  async findAll(userId?: User['id']) {
    return this.bookRepository.find({ where: { user: { id: userId } } });
  }

  async create(createBookDto: CreateBookDto) {
    const user = await this.userService.findOne(createBookDto.userId);
    const book = await this.bookRepository.create({ ...createBookDto, user });

    return book.save();
  }

  async update(id: number, bookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({ id, ...bookDto });

    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }

    return book.save();
  }
}
