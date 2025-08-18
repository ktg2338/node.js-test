import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = passwordHash;
    const user = this.em.create(User, createUserDto);
    await this.em.persistAndFlush(user);
    return user;
  }

  findAll() {
    return this.em.find(User, {}, { populate: ['posts', 'posts.tags'], orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    return this.em.findOneOrFail(User, id, { populate: ['posts', 'posts.tags'] });
  }

  async findOneByName(name: string) {
    return this.userRepository.findOne({ name });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.em.findOneOrFail(User, id);
    this.em.assign(user, updateUserDto);
    await this.em.flush();
    return user;
  }

  async remove(id: number) {
    const user = await this.em.findOneOrFail(User, id);
    await this.em.removeAndFlush(user);
    return user;
  }
}
