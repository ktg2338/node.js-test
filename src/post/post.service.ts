import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { Post } from './entities/post.entity';
import { Tag } from '../tag/entities/tag.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(private readonly em: EntityManager) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.em.create(Post, {
      title: createPostDto.title,
      author: this.em.getReference(User, createPostDto.authorId),
      tags: createPostDto.tagIds?.map((id) => this.em.getReference(Tag, id)) ?? [],
    });
    await this.em.persistAndFlush(post);
    return post;
  }

  findAll() {
    return this.em.find(Post, {}, { populate: ['author', 'tags'], orderBy: { title: 'asc' } });
  }

  findOne(id: number) {
    return this.em.findOne(Post, id, { populate: ['author', 'tags'] });
  }

  async search({ title, authorName, tagNames }: SearchPostDto) {
    const qb = this.em
      .createQueryBuilder(Post, 'p')
      .leftJoinAndSelect('p.author', 'a')
      .leftJoinAndSelect('p.tags', 't')
      .distinct();

    if (title) {
      qb.where('p.title ilike ?', [`%${title}%`]);
    }
    if (authorName) {
      qb.andWhere('a.name ilike ?', [`%${authorName}%`]);
    }
    if (tagNames?.length) {
      const subQuery =
        'select pt.post_id from post_tags pt ' +
        'join tag t2 on t2.id = pt.tag_id ' +
        'where t2.name in (?) ' +
        'group by pt.post_id ' +
        'having count(distinct t2.id) = ?';

      qb.andWhere(`p.id in (${subQuery})`, [tagNames, tagNames.length]);
    }

    return qb.getResultList();
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.em.findOneOrFail(Post, id, { populate: ['tags'] });
    if (updatePostDto.authorId) {
      post.author = this.em.getReference(User, updatePostDto.authorId);
    }
    if (updatePostDto.tagIds) {
      post.tags.removeAll();
      const tags = updatePostDto.tagIds.map((id) =>
        this.em.getReference(Tag, id),
      );
      tags.forEach((tag) => post.tags.add(tag));
    }
    this.em.assign(post, updatePostDto);
    await this.em.flush();
    return post;
  }

  async remove(id: number) {
    const post = await this.em.findOneOrFail(Post, id);
    await this.em.removeAndFlush(post);
    return post;
  }
}
