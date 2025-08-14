import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';

import { Post } from '../../post/entities/post.entity';

@Entity()
export class Tag {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts = new Collection<Post>(this);
}
