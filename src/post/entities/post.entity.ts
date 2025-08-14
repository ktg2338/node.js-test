import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

import { Tag } from '../../tag/entities/tag.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Post {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @ManyToOne()
  author!: User;

  @ManyToMany(() => Tag, (tag) => tag.posts, { owner: true })
  tags = new Collection<Tag>(this);
}
