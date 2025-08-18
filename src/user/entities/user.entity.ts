import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';

import { Post } from '../../post/entities/post.entity';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ hidden: true })
  password!: string;

  @OneToMany(() => Post, (post) => post.author)
  posts = new Collection<Post>(this);
}
