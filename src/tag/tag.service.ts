import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(private readonly em: EntityManager) {}

  async create(createTagDto: CreateTagDto) {
    const tag = this.em.create(Tag, createTagDto);
    await this.em.persistAndFlush(tag);
    return tag;
  }

  findAll() {
    return this.em.find(Tag, {}, { populate: ['posts', 'posts.author'] });
  }

  findOne(id: number) {
    return this.em.findOne(Tag, id, { populate: ['posts', 'posts.author'] });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.em.findOneOrFail(Tag, id);
    this.em.assign(tag, updateTagDto);
    await this.em.flush();
    return tag;
  }

  async remove(id: number) {
    const tag = await this.em.findOneOrFail(Tag, id);
    await this.em.removeAndFlush(tag);
    return tag;
  }
}
