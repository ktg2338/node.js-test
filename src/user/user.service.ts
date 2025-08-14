import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.em.create(User, createUserDto);
    await this.em.persistAndFlush(user);
    return user;
  }

  findAll() {
    return this.em.find(User, {}, { populate: ['posts', 'posts.tags'], orderBy: { name: 'asc' } });
  }

  findOne(id: number) {
    return this.em.findOne(User, id, { populate: ['posts', 'posts.tags'] });
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
