import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';

import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToMany(() => Post, (post) => post.author)
  posts = new Collection<Post>(this);
}
