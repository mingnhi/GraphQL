import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryModel } from './category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  async getOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { id }, relations: ['products'] });
    if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  async create(name: string): Promise<CategoryEntity> {
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }

  async update(id: number, name: string): Promise<CategoryEntity> {
    const category = await this.getOne(id);
    category.name = name;
    return this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);
    return result.affected > 0;
  }
}
