import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Items } from './items';
import { Item } from './item';
import { JwtGuard } from 'src/authz/jwt.guard';

@Controller('items')
@UseGuards(JwtGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Items> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Item> {
    return this.itemsService.find(id);
  }

  @Post()
  async create(@Body('item') item: Item): Promise<void> {
    this.itemsService.create(item);
  }

  @Put()
  async update(@Body('item') item: Item): Promise<void> {
    this.itemsService.update(item);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    this.itemsService.delete(id);
  }
}
